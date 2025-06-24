import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScaledSize,
  LayoutRectangle,
  GestureResponderEvent,
  LayoutChangeEvent,
} from "react-native";
import DefaultTimer from "./DefaultTimer";
import DefaultTouchProcessor from "./DefaultTouchProcessor";
import { GameLoopProperties } from "./types/GameLoopProperties";
import { GameTimer } from "./types/GameTimer";
import { TouchProcessorApi } from "./types/TouchProcessorApi";
import { TouchEvent } from "./types/TouchEvent";
import { GameLoopUpdateEventOptionType } from "./types/GameLoopUpdateEventOptionType";

export default class GameLoop extends Component<GameLoopProperties> {
  private timer: GameTimer;
  private touches: TouchEvent[];
  private screen: ScaledSize;
  private previousTime: number | null;
  private previousDelta: number | null;
  private touchProcessor: TouchProcessorApi | undefined;
  private layout: LayoutRectangle | null;

  constructor(props: GameLoopProperties) {
    super(props);
    this.timer = props.timer || new DefaultTimer();
    this.timer.subscribe(this.updateHandler);
    this.touches = [];
    this.screen = Dimensions.get("window");
    this.previousTime = null;
    this.previousDelta = null;
    this.touchProcessor = props.touchProcessor?.(this.touches);
    this.layout = null;
  }

  componentDidMount() {
    if (this.props.running) this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.timer.unsubscribe(this.updateHandler);
    if (this.touchProcessor?.end) this.touchProcessor.end();
  }

  UNSAFE_componentWillReceiveProps(nextProps: GameLoopProperties) {
    if (nextProps.running !== this.props.running) {
      if (nextProps.running) this.start();
      else this.stop();
    }
  }

  start = () => {
    this.touches.length = 0;
    this.previousTime = null;
    this.previousDelta = null;
    this.timer.start();
  };

  stop = () => {
    this.timer.stop();
  };

  updateHandler = (currentTime: number) => {
    const args: GameLoopUpdateEventOptionType = {
      touches: this.touches,
      screen: this.screen,
      layout: this.layout,
      time: {
        current: currentTime,
        previous: this.previousTime,
        delta: currentTime - (this.previousTime || currentTime),
        previousDelta: this.previousDelta,
      },
    };

    if (this.props.onUpdate) this.props.onUpdate(args);

    this.touches.length = 0;
    this.previousTime = currentTime;
    this.previousDelta = args.time.delta;
  };

  onLayoutHandler = (e: LayoutChangeEvent) => {
    this.screen = Dimensions.get("window");
    this.layout = e.nativeEvent.layout;
    this.forceUpdate();
  };

  onTouchStartHandler = (e: GestureResponderEvent) => {
    this.touchProcessor?.process("start", e.nativeEvent);
  };

  onTouchMoveHandler = (e: GestureResponderEvent) => {
    this.touchProcessor?.process("move", e.nativeEvent);
  };

  onTouchEndHandler = (e: GestureResponderEvent) => {
    this.touchProcessor?.process("end", e.nativeEvent);
  };

  render() {
    return (
      <View
        style={[css.container, this.props.style]}
        onLayout={this.onLayoutHandler}
        onTouchStart={this.onTouchStartHandler}
        onTouchMove={this.onTouchMoveHandler}
        onTouchEnd={this.onTouchEndHandler}
      >
        {this.props.children}
      </View>
    );
  }
}

/* @ts-expect-error this is for backward compatibility, its recommended to use functional components and default values */
GameLoop.defaultProps = {
  touchProcessor: DefaultTouchProcessor({
    triggerPressEventBefore: 200,
    triggerLongPressEventAfter: 700,
  }),
  running: true,
};

const css = StyleSheet.create({
  container: {
    flex: 1,
  },
});
