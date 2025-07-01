import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { GameEngineEntitiesOrResolver } from "./GameEngineEntities";
import { GameRenderer } from "./GameRenderer";
import { TouchProcessor } from "./TouchProcessor";
import { GameEngineSystem } from "./GameEngineSystem";
import { GameTimer } from "./GameTimer";
import { GameEngineEvent } from "./GameEngineEvents";
export type GameEngineEventHandler = (event: GameEngineEvent) => void;
export interface GameEngineProperties {
    systems?: GameEngineSystem[];
    entities?: GameEngineEntitiesOrResolver;
    renderer?: GameRenderer;
    touchProcessor?: TouchProcessor;
    timer?: GameTimer;
    running?: boolean;
    onEvent?: GameEngineEventHandler;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
}
