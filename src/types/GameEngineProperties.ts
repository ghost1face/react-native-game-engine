import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { GameEngineEntitiesOrResolver } from "./GameEngineEntities";
import { GameRenderer } from "./GameRenderer";
import { TouchProcessor } from "./TouchProcessor";
import { GameEngineSystem } from "./GameEngineSystem";

export interface GameEngineProperties {
  systems?: GameEngineSystem[];
  entities?: GameEngineEntitiesOrResolver;
  renderer?: GameRenderer;
  touchProcessor?: TouchProcessor;
  timer?: any;
  running?: boolean;
  onEvent?: any;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}
