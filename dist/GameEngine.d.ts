import React, { Component } from "react";
import { LayoutChangeEvent, GestureResponderEvent } from "react-native";
import { GameEngineProperties } from "./types/GameEngineProperties";
import { GameEngineEntities, GameEngineEntitiesOrResolver, GameEngineEntityBaseType } from "./types/GameEngineEntities";
import { GameEngineEvent } from "./types/GameEngineEvents";
import { GameEngineEntity } from "./types/GameEngineEntity";
type GameEngineState<TEntities extends Record<string | number, GameEngineEntity>> = {
    entities: GameEngineEntities<TEntities>;
};
export default class GameEngine<TEntities extends GameEngineEntityBaseType = GameEngineEntityBaseType> extends Component<GameEngineProperties<TEntities>, GameEngineState<TEntities>> {
    private timer;
    private touches;
    private screen;
    private previousTime;
    private previousDelta;
    private events;
    private touchProcessor;
    private layout;
    constructor(props: GameEngineProperties<TEntities>);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: GameEngineProperties<TEntities>): void;
    clear: () => void;
    start: () => void;
    stop: () => void;
    swap: (newEntities: GameEngineEntitiesOrResolver<TEntities>) => Promise<void>;
    publish: (e: GameEngineEvent) => void;
    publishEvent: (e: GameEngineEvent) => void;
    dispatch: (e: GameEngineEvent) => void;
    dispatchEvent: (e: GameEngineEvent) => void;
    updateHandler: (currentTime: number) => void;
    onLayoutHandler: (e: LayoutChangeEvent) => void;
    onTouchStartHandler: (e: GestureResponderEvent) => void;
    onTouchMoveHandler: (e: GestureResponderEvent) => void;
    onTouchEndHandler: (e: GestureResponderEvent) => void;
    render(): React.JSX.Element;
}
export {};
