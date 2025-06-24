import React, { Component } from "react";
import { LayoutChangeEvent, GestureResponderEvent } from "react-native";
import { GameEngineProperties } from "./types/GameEngineProperties";
import { GameEngineEntities, GameEngineEntitiesOrResolver } from "./types/GameEngineEntities";
import { GameEngineEvent } from "./types/GameEngineEvents";
type GameEngineState = {
    entities: GameEngineEntities;
};
export default class GameEngine extends Component<GameEngineProperties, GameEngineState> {
    private timer;
    private touches;
    private screen;
    private previousTime;
    private previousDelta;
    private events;
    private touchProcessor;
    private layout;
    constructor(props: GameEngineProperties);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: GameEngineProperties): void;
    clear: () => void;
    start: () => void;
    stop: () => void;
    swap: (newEntities: GameEngineEntitiesOrResolver) => Promise<void>;
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
