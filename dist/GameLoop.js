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
const DefaultTouchProcessor_1 = __importDefault(require("./DefaultTouchProcessor"));
class GameLoop extends react_1.Component {
    timer;
    touches;
    screen;
    previousTime;
    previousDelta;
    touchProcessor;
    layout;
    constructor(props) {
        super(props);
        this.timer = props.timer || new DefaultTimer_1.default();
        this.timer.subscribe(this.updateHandler);
        this.touches = [];
        this.screen = react_native_1.Dimensions.get("window");
        this.previousTime = null;
        this.previousDelta = null;
        this.touchProcessor = props.touchProcessor?.(this.touches);
        this.layout = null;
    }
    componentDidMount() {
        if (this.props.running)
            this.start();
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
    start = () => {
        this.touches.length = 0;
        this.previousTime = null;
        this.previousDelta = null;
        this.timer.start();
    };
    stop = () => {
        this.timer.stop();
    };
    updateHandler = (currentTime) => {
        const args = {
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
        if (this.props.onUpdate)
            this.props.onUpdate(args);
        this.touches.length = 0;
        this.previousTime = currentTime;
        this.previousDelta = args.time.delta;
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
        return (<react_native_1.View style={[css.container, this.props.style]} onLayout={this.onLayoutHandler} onTouchStart={this.onTouchStartHandler} onTouchMove={this.onTouchMoveHandler} onTouchEnd={this.onTouchEndHandler}>
        {this.props.children}
      </react_native_1.View>);
    }
}
exports.default = GameLoop;
/* @ts-expect-error this is for backward compatibility, its recommended to use functional components and default values */
GameLoop.defaultProps = {
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
});
//# sourceMappingURL=GameLoop.js.map