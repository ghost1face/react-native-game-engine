import React, { Component } from "react";
import { GestureResponderEvent, LayoutChangeEvent } from "react-native";
import { GameLoopProperties } from "./types/GameLoopProperties";
export default class GameLoop extends Component<GameLoopProperties> {
    private timer;
    private touches;
    private screen;
    private previousTime;
    private previousDelta;
    private touchProcessor;
    private layout;
    constructor(props: GameLoopProperties);
    componentDidMount(): void;
    componentWillUnmount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: GameLoopProperties): void;
    start: () => void;
    stop: () => void;
    updateHandler: (currentTime: number) => void;
    onLayoutHandler: (e: LayoutChangeEvent) => void;
    onTouchStartHandler: (e: GestureResponderEvent) => void;
    onTouchMoveHandler: (e: GestureResponderEvent) => void;
    onTouchEndHandler: (e: GestureResponderEvent) => void;
    render(): React.JSX.Element;
}
