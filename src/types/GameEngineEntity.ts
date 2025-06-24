import { Component, FC, ReactElement } from "react";
import { GameEntityRendererProps } from "./GameEntityRendererProps";

export interface GameEngineEntity {
  renderer?:
    | Component<GameEntityRendererProps>
    | FC<GameEntityRendererProps>
    | ReactElement;
  [key: string]: any;
}

export type GameEngineEntityOfType<T> = T & GameEngineEntity;
