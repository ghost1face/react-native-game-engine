"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const DefaultTimer_1 = __importDefault(require("./DefaultTimer"));
const DefaultRenderer_1 = __importDefault(require("./DefaultRenderer"));
const DefaultTouchProcessor_1 = __importDefault(require("./DefaultTouchProcessor"));
function getEntitiesFromProps(props) {
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
        props.entities);
}
const isPromise = (obj) => {
    return !!(obj &&
        obj.then &&
        obj.then.constructor &&
        obj.then.call &&
        obj.then.apply);
};
class GameEngine extends react_1.Component {
    timer;
    touches;
    screen;
    previousTime;
    previousDelta;
    events;
    touchProcessor;
    layout;
    constructor(props) {
        super(props);
        this.state = {
            entities: {},
        };
        this.timer = props.timer || new DefaultTimer_1.default();
        this.timer.subscribe(this.updateHandler);
        this.touches = [];
        this.screen = react_native_1.Dimensions.get("window");
        this.previousTime = null;
        this.previousDelta = null;
        this.events = [];
        this.touchProcessor = props.touchProcessor?.(this.touches);
        this.layout = null;
    }
    async componentDidMount() {
        let entities;
        const initialEntities = getEntitiesFromProps(this.props);
        if (isPromise(initialEntities)) {
            entities = await initialEntities;
        }
        else {
            entities = initialEntities;
        }
        this.setState({
            entities: entities || {},
        }, () => {
            if (this.props.running)
                this.start();
        });
    }
    componentWillUnmount() {
        this.stop();
        this.timer.unsubscribe(this.updateHandler);
        if (this.touchProcessor?.end)
            this.touchProcessor.end();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.running !== this.props.running) {
            if (nextProps.running)
                this.start();
            else
                this.stop();
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
    swap = async (newEntities) => {
        let entities;
        if (isPromise(newEntities)) {
            entities = await newEntities;
        }
        else {
            entities = newEntities;
        }
        this.setState({ entities: entities || {} }, () => {
            this.clear();
            this.dispatch({ type: "swapped" });
        });
    };
    publish = (e) => {
        this.dispatch(e);
    };
    publishEvent = (e) => {
        this.dispatch(e);
    };
    dispatch = (e) => {
        setTimeout(() => {
            this.events.push(e);
            if (this.props.onEvent)
                this.props.onEvent(e);
        }, 0);
    };
    dispatchEvent = (e) => {
        this.dispatch(e);
    };
    updateHandler = (currentTime) => {
        const args = {
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
        const newState = this.props.systems?.reduce((state, sys) => sys(state, args), this.state.entities);
        this.touches.length = 0;
        this.events.length = 0;
        this.previousTime = currentTime;
        this.previousDelta = args.time.delta;
        this.setState({ entities: newState || {} });
    };
    onLayoutHandler = (e) => {
        this.screen = react_native_1.Dimensions.get("window");
        this.layout = e.nativeEvent.layout;
        this.forceUpdate();
    };
    onTouchStartHandler = (e) => {
        this.touchProcessor?.process("start", e.nativeEvent);
    };
    onTouchMoveHandler = (e) => {
        this.touchProcessor?.process("move", e.nativeEvent);
    };
    onTouchEndHandler = (e) => {
        this.touchProcessor?.process("end", e.nativeEvent);
    };
    render() {
        return (<react_native_1.View style={[css.container, this.props.style]} onLayout={this.onLayoutHandler}>
        <react_native_1.View style={css.entityContainer} onTouchStart={this.onTouchStartHandler} onTouchMove={this.onTouchMoveHandler} onTouchEnd={this.onTouchEndHandler}>
          {this.props.renderer?.(this.state.entities, this.screen, this.layout)}
        </react_native_1.View>

        <react_native_1.View pointerEvents={"box-none"} style={react_native_1.StyleSheet.absoluteFill}>
          {this.props.children}
        </react_native_1.View>
      </react_native_1.View>);
    }
}
exports.default = GameEngine;
/* @ts-expect-error this is for backward compatibility, its recommended to use functional components and default values */
GameEngine.defaultProps = {
    systems: [],
    entities: {},
    renderer: DefaultRenderer_1.default,
    touchProcessor: (0, DefaultTouchProcessor_1.default)({
        triggerPressEventBefore: 200,
        triggerLongPressEventAfter: 700,
    }),
    running: true,
};
const css = react_native_1.StyleSheet.create({
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
//# sourceMappingURL=GameEngine.js.map