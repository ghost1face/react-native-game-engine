import { ReactElement } from "react";
import { LayoutRectangle, ScaledSize } from "react-native";
import { GameEngineEntities, GameEngineEntityBaseType } from "./GameEngineEntities";
export type GameRenderer<T extends GameEngineEntityBaseType = GameEngineEntityBaseType> = (entities: GameEngineEntities<T>, screen: ScaledSize, layout: LayoutRectangle) => ReactElement | null;
