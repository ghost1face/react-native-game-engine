import GameLoop from "./GameLoop";
import GameEngine from "./GameEngine";
import DefaultTouchProcessor from "./DefaultTouchProcessor";
import DefaultRenderer from "./DefaultRenderer";
import DefaultTimer from "./DefaultTimer";

export {
  GameLoop,
  GameLoop as BasicGameLoop,
  GameEngine,
  GameEngine as ComponentEntitySystem,
  GameEngine as ComponentEntitySystems,
  DefaultTouchProcessor,
  DefaultRenderer,
  DefaultTimer,
};

export type {
  GameEngineEntities,
  GameEngineEntitiesResolver,
  GameEngineEntitiesOrResolver,
} from "./types/GameEngineEntities";
export type { GameEngineEntity } from "./types/GameEngineEntity";
export type {
  GameEngineStartedEvent,
  GameEngineStoppedEvent,
  GameEngineSwappedEvent,
  GameEngineEvent,
} from "./types/GameEngineEvents";
export type { GameEngineProperties } from "./types/GameEngineProperties";
export type { GameEngineSystem } from "./types/GameEngineSystem";
export type { GameEngineUpdateEventOptionType } from "./types/GameEngineUpdateEventOptionType";
export type { GameEntityRendererProps } from "./types/GameEntityRendererProps";
export type { GameLoopProperties } from "./types/GameLoopProperties";
export type { GameLoopUpdateEventOptionType } from "./types/GameLoopUpdateEventOptionType";
export type { GameRenderer } from "./types/GameRenderer";
export type { GameTimer } from "./types/GameTimer";
export type { GameTimerCallback } from "./types/GameTimerCallback";
export type { TimeUpdate } from "./types/TimeUpdate";
export type { TouchEvent } from "./types/TouchEvent";
export type { TouchEventType } from "./types/TouchEventType";
export type { TouchProcessorApi } from "./types/TouchProcessorApi";
export type { TouchProcessor } from "./types/TouchProcessor";
