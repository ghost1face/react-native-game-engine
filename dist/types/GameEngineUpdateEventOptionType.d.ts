import { LayoutRectangle, ScaledSize } from "react-native";
import { TouchEvent } from "./TouchEvent";
import { TimeUpdate } from "./TimeUpdate";
import { GameEngineEvent } from "./GameEngineEvents";
export interface GameEngineUpdateEventOptionType {
    dispatch: (event: GameEngineEvent) => void;
    events: GameEngineEvent[];
    screen: ScaledSize;
    layout: LayoutRectangle | null;
    time: TimeUpdate;
    touches: TouchEvent[];
}
