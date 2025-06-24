import { ReactElement } from "react";
import { LayoutRectangle, ScaledSize } from "react-native";
import { GameEngineEntities } from "./GameEngineEntities";

export type GameRenderer = (
  entities: GameEngineEntities,
  screen: ScaledSize,
  layout: LayoutRectangle
) => ReactElement | null;
