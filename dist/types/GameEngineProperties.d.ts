import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { GameEngineEntitiesOrResolver, GameEngineEntityBaseType } from "./GameEngineEntities";
import { GameRenderer } from "./GameRenderer";
import { TouchProcessor } from "./TouchProcessor";
import { GameEngineSystem } from "./GameEngineSystem";
import { GameTimer } from "./GameTimer";
import { GameEngineEvent } from "./GameEngineEvents";
export type GameEngineEventHandler = (event: GameEngineEvent) => void;
export interface GameEngineProperties<T extends GameEngineEntityBaseType = GameEngineEntityBaseType> {
    systems?: GameEngineSystem<T>[];
    entities?: GameEngineEntitiesOrResolver<T>;
    renderer?: GameRenderer;
    touchProcessor?: TouchProcessor;
    timer?: GameTimer;
    running?: boolean;
    onEvent?: GameEngineEventHandler;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
}
