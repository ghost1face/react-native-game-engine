import { TouchEvent } from "./types/TouchEvent";
import { NativeTouchEvent } from "react-native";
import { TouchEventType } from "./types/TouchEventType";
declare const _default: ({ triggerPressEventBefore, triggerLongPressEventAfter, moveThreshold, }: {
    triggerPressEventBefore?: number | undefined;
    triggerLongPressEventAfter?: number | undefined;
    moveThreshold?: number | undefined;
}) => (touches: TouchEvent[]) => {
    process(type: TouchEventType, event: NativeTouchEvent): void;
    end(): void;
};
export default _default;
