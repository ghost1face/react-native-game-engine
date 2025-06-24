import { LayoutRectangle, ScaledSize } from "react-native";
import { TimeUpdate } from "./TimeUpdate";
import { TouchEvent } from "./TouchEvent";
export interface GameLoopUpdateEventOptionType {
    touches: TouchEvent[];
    layout: LayoutRectangle | null;
    screen: ScaledSize;
    time: TimeUpdate;
}
