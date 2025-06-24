export interface GameEngineStartedEvent {
  type: "started";
}
export interface GameEngineStoppedEvent {
  type: "stopped";
}
export interface GameEngineSwappedEvent {
  type: "swapped";
}

export type GameEngineEvent =
  | GameEngineStartedEvent
  | GameEngineStoppedEvent
  | GameEngineSwappedEvent;
