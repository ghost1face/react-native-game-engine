import { StyleProp, ViewStyle } from "react-native";
import { GameLoopUpdateEventOptionType } from "./GameLoopUpdateEventOptionType";
import { TouchProcessor } from "./TouchProcessor";
import { GameTimer } from "./GameTimer";
import { ReactNode } from "react";

export interface GameLoopProperties {
  touchProcessor?: TouchProcessor;
  timer?: GameTimer;
  running?: boolean;
  onUpdate?: (args: GameLoopUpdateEventOptionType) => void;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}
