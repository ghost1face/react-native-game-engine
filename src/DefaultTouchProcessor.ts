import { Subject, EMPTY, of, merge } from "rxjs";
import {
  mergeMap,
  first,
  timeoutWith,
  delay,
  takeUntil,
  map,
  groupBy,
  filter,
  pairwise,
} from "rxjs/operators";
import { TouchEvent } from "./types/TouchEvent";
import { NativeTouchEvent } from "react-native";
import { TouchEventType } from "./types/TouchEventType";

export default ({
  triggerPressEventBefore = 200,
  triggerLongPressEventAfter = 700,
  moveThreshold = 0,
}) => {
  return (touches: TouchEvent[]) => {
    const touchStart = new Subject<NativeTouchEvent>().pipe(
      map(
        (e: NativeTouchEvent) =>
          ({
            id: e.identifier,
            type: "start",
            event: e,
          } as unknown as TouchEvent)
      )
    );

    const touchMove = new Subject<NativeTouchEvent>().pipe(
      map(
        (e: NativeTouchEvent) =>
          ({
            id: e.identifier,
            type: "move",
            event: e,
          } as unknown as TouchEvent)
      )
    );

    const touchEnd = new Subject<NativeTouchEvent>().pipe(
      map(
        (e: NativeTouchEvent) =>
          ({ id: e.identifier, type: "end", event: e } as unknown as TouchEvent)
      )
    );

    const touchPress = touchStart.pipe(
      mergeMap((e: TouchEvent) =>
        touchEnd.pipe(
          first((x) => x.id === e.id),
          timeoutWith(triggerPressEventBefore, EMPTY)
        )
      ),
      map((e) => ({ ...e, type: "press" } as TouchEvent))
    );

    const touchMoveDelta = merge(touchStart, touchMove, touchEnd).pipe(
      groupBy((e) => e.id),
      mergeMap((group) =>
        group.pipe(
          pairwise(),
          map(([e1, e2]) => {
            if (e1.type !== "end" && e2.type === "move") {
              return <TouchEvent>{
                id: group.key,
                type: "move",
                event: e2.event,
                delta: {
                  locationX: e2.event.locationX - e1.event.locationX,
                  locationY: e2.event.locationY - e1.event.locationY,
                  pageX: e2.event.pageX - e1.event.pageX,
                  pageY: e2.event.pageY - e1.event.pageY,
                  timestamp: e2.event.timestamp - e1.event.timestamp,
                },
              };
            }
          }),
          filter((e) => typeof e !== "undefined"),
          filter(
            (e) =>
              (e.delta?.pageX ?? 0) ** 2 + (e.delta?.pageY ?? 0) ** 2 >
              moveThreshold ** 2
          )
        )
      )
    );

    const longTouch = touchStart.pipe(
      mergeMap((e) =>
        of(e).pipe(
          delay(triggerLongPressEventAfter),
          takeUntil(
            merge(touchMoveDelta, touchEnd).pipe(first((x) => x.id === e.id))
          )
        )
      ),
      map((e) => ({ ...e, type: "long-press" } as TouchEvent))
    );

    const subscriptions = [
      touchStart,
      touchEnd,
      touchPress,
      longTouch,
      touchMoveDelta,
    ].map((x) => x.subscribe((y) => touches.push(y)));

    return {
      process(type: TouchEventType, event: NativeTouchEvent) {
        switch (type) {
          case "start":
            (touchStart as unknown as Subject<NativeTouchEvent>).next(event);
            break;
          case "move":
            (touchMove as unknown as Subject<NativeTouchEvent>).next(event);
            break;
          case "end":
            (touchEnd as unknown as Subject<NativeTouchEvent>).next(event);
            break;
        }
      },
      end() {
        subscriptions.forEach((x) => x.unsubscribe());

        (touchStart as unknown as Subject<NativeTouchEvent>).unsubscribe();
        (touchMove as unknown as Subject<NativeTouchEvent>).unsubscribe();
        (touchEnd as unknown as Subject<NativeTouchEvent>).unsubscribe();
        (touchPress as unknown as Subject<NativeTouchEvent>).unsubscribe();
        (longTouch as unknown as Subject<NativeTouchEvent>).unsubscribe();
      },
    };
  };
};
