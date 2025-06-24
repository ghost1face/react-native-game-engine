import { NativeTouchEvent } from "react-native";
import { TouchEventType } from "./TouchEventType";
export interface TouchProcessorApi {
    process(type: TouchEventType, event: NativeTouchEvent): void;
    end(): void;
}
