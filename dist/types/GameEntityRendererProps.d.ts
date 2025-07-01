import { ScaledSize, LayoutRectangle } from "react-native";
import { GameEngineEntity } from "./GameEngineEntity";
export type GameEntityRendererProps = {
    screen: ScaledSize;
    layout: LayoutRectangle;
    [key: string]: any;
} & GameEngineEntity;
