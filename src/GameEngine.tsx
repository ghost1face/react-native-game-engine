import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScaledSize,
  LayoutChangeEvent,
  LayoutRectangle,
  GestureResponderEvent,
} from "react-native";
import DefaultTimer from "./DefaultTimer";
import DefaultRenderer from "./DefaultRenderer";
import DefaultTouchProcessor from "./DefaultTouchProcessor";
import { GameEngineProperties } from "./types/GameEngineProperties";
import { GameTimer } from "./types/GameTimer";
import { TouchProcessorApi } from "./types/TouchProcessorApi";
import { TouchEvent } from "./types/TouchEvent";
import {
  GameEngineEntities,
  GameEngineEntitiesOrResolver,
  GameEngineEntityBaseType,
} from "./types/GameEngineEntities";
import { GameEngineUpdateEventOptionType } from "./types/GameEngineUpdateEventOptionType";
import { GameEngineEvent } from "./types/GameEngineEvents";
import { GameEngineEntity } from "./types/GameEngineEntity";

function getEntitiesFromProps<T extends GameEngineEntityBaseType>(
  props: GameEngineProperties<T>
): GameEngineEntitiesOrResolver<T> {
  return (
    /* @ts-expect-error this is for backward compatibility */
    props.initState ||
    /* @ts-expect-error this is for backward compatibility */
    props.initialState ||
    /* @ts-expect-error this is for backward compatibility */
    props.state ||
    /* @ts-expect-error this is for backward compatibility */
    props.initEntities ||
    /* @ts-expect-error this is for backward compatibility */
    props.initialEntities ||
    props.entities
  );
}

const isPromise = (obj: any) => {
  return !!(
    obj &&
    obj.then &&
    obj.then.constructor &&
    obj.then.call &&
    obj.then.apply
  );
};

type GameEngineState<
  TEntities extends Record<string | number, GameEngineEntity>
> = {
  entities: GameEngineEntities<TEntities>;
};

export default class GameEngine<
  TEntities extends GameEngineEntityBaseType = GameEngineEntityBaseType
> extends Component<
  GameEngineProperties<TEntities>,
  GameEngineState<TEntities>
> {
  private timer: GameTimer;
  private touches: TouchEvent[];
  private screen: ScaledSize;
  private previousTime: number | null;
  private previousDelta: number | null;
  private events: GameEngineEvent[];
  private touchProcessor: TouchProcessorApi | undefined;
  private layout: LayoutRectangle | null;

  constructor(props: GameEngineProperties<TEntities>) {
    super(props);

    this.state = {
      entities: {} as GameEngineEntities<TEntities>,
    };

    this.timer = props.timer || new DefaultTimer();
    this.timer.subscribe(this.updateHandler);
    this.touches = [];
    this.screen = Dimensions.get("window");
    this.previousTime = null;
    this.previousDelta = null;
    this.events = [];
    this.touchProcessor = props.touchProcessor?.(this.touches);
    this.layout = null;
  }

  async componentDidMount() {
    let entities: GameEngineEntities<TEntities> | null;
    const initialEntities = getEntitiesFromProps<TEntities>(
      this.props as GameEngineProperties<TEntities>
    );

    if (isPromise(initialEntities)) {
      entities = await initialEntities;
    } else {
      entities = initialEntities as GameEngineEntities<TEntities>;
    }

    this.setState(
      {
        entities: entities || {},
      },
      () => {
        if (this.props.running) this.start();
      }
    );
  }

  componentWillUnmount() {
    this.stop();
    this.timer.unsubscribe(this.updateHandler);
    if (this.touchProcessor?.end) this.touchProcessor.end();
  }

  UNSAFE_componentWillReceiveProps(nextProps: GameEngineProperties<TEntities>) {
    if (nextProps.running !== this.props.running) {
      if (nextProps.running) this.start();
      else this.stop();
    }
  }

  clear = () => {
    this.touches.length = 0;
    this.events.length = 0;
    this.previousTime = null;
    this.previousDelta = null;
  };

  start = () => {
    this.clear();
    this.timer.start();
    this.dispatch({ type: "started" });
  };

  stop = () => {
    this.timer.stop();
    this.dispatch({ type: "stopped" });
  };

  swap = async (newEntities: GameEngineEntitiesOrResolver<TEntities>) => {
    let entities: GameEngineEntities<TEntities> | null;
    if (isPromise(newEntities)) {
      entities = await newEntities;
    } else {
      entities = newEntities as GameEngineEntities<TEntities>;
    }

    this.setState({ entities: entities || {} }, () => {
      this.clear();
      this.dispatch({ type: "swapped" });
    });
  };

  publish = (e: GameEngineEvent) => {
    this.dispatch(e);
  };

  publishEvent = (e: GameEngineEvent) => {
    this.dispatch(e);
  };

  dispatch = (e: GameEngineEvent) => {
    setTimeout(() => {
      this.events.push(e);
      if (this.props.onEvent) this.props.onEvent(e);
    }, 0);
  };

  dispatchEvent = (e: GameEngineEvent) => {
    this.dispatch(e);
  };

  updateHandler = (currentTime: number) => {
    const args: GameEngineUpdateEventOptionType = {
      touches: this.touches,
      screen: this.screen,
      layout: this.layout,
      events: this.events,
      dispatch: this.dispatch,
      time: {
        current: currentTime,
        previous: this.previousTime,
        delta: currentTime - (this.previousTime || currentTime),
        previousDelta: this.previousDelta,
      },
    };

    const newState = this.props.systems?.reduce(
      (state, sys) => sys(state, args),
      this.state.entities
    ) as GameEngineEntities<TEntities>;

    this.touches.length = 0;
    this.events.length = 0;
    this.previousTime = currentTime;
    this.previousDelta = args.time.delta;
    this.setState({ entities: newState || {} });
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
      >
        <View
          style={css.entityContainer}
          onTouchStart={this.onTouchStartHandler}
          onTouchMove={this.onTouchMoveHandler}
          onTouchEnd={this.onTouchEndHandler}
        >
          {this.props.renderer?.(
            this.state.entities,
            this.screen,
            this.layout!
          )}
        </View>

        <View pointerEvents={"box-none"} style={StyleSheet.absoluteFill}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

/* @ts-expect-error this is for backward compatibility, its recommended to use functional components and default values */
GameEngine.defaultProps = {
  systems: [],
  entities: {},
  renderer: DefaultRenderer,
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
  entityContainer: {
    flex: 1,
    //-- Looks like Android requires bg color here
    //-- to register touches. If we didn't worry about
    //-- 'children' (foreground) components capturing events,
    //-- this whole shenanigan could be avoided..
    backgroundColor: "transparent",
  },
});
