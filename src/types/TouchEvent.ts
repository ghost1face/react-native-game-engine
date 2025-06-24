import { TouchEventType } from "./TouchEventType";

export interface TouchEvent {
  event: {
    changedTouches: Array<TouchEvent>;
    identifier: number;
    locationX: number;
    locationY: number;
    pageX: number;
    pageY: number;
    target: number;
    timestamp: number;
    touches: Array<TouchEvent>;
  };
  id: number;
  type: TouchEventType;
  delta?: {
    locationX: number;
    locationY: number;
    pageX: number;
    pageY: number;
    timestamp: number;
  };
}
