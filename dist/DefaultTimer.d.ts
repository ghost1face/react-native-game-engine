import { GameTimer } from "./types/GameTimer";
import { GameTimerCallback } from "./types/GameTimerCallback";
export default class DefaultTimer implements GameTimer {
    private subscribers;
    private loopId;
    constructor();
    loop: (time?: number) => void;
    start(): void;
    stop(): void;
    subscribe(callback: GameTimerCallback): void;
    unsubscribe(callback: GameTimerCallback): void;
}
