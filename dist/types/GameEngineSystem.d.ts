import { GameEngineEntities } from "./GameEngineEntities";
import { GameEngineUpdateEventOptionType } from "./GameEngineUpdateEventOptionType";
export type GameEngineSystem<T extends GameEngineEntities = GameEngineEntities> = (entities: T, update: GameEngineUpdateEventOptionType) => GameEngineEntities;
