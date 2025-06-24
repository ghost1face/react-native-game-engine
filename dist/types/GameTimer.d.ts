import { GameTimerCallback } from "./GameTimerCallback";
export interface GameTimer {
    start: VoidFunction;
    stop: VoidFunction;
    subscribe: (callback: GameTimerCallback) => void;
    unsubscribe: (callback: GameTimerCallback) => void;
}
