import { GameEngineEntityOfOptionalType } from "./GameEngineEntity";
export type GameEngineEntityBaseType = Record<string | number, GameEngineEntityOfOptionalType>;
export type GameEngineEntities<T extends GameEngineEntityBaseType = GameEngineEntityBaseType> = T;
export type GameEngineEntitiesResolver<T extends GameEngineEntityBaseType = GameEngineEntityBaseType> = Promise<GameEngineEntities<T>>;
export type GameEngineEntitiesOrResolver<T extends GameEngineEntityBaseType = GameEngineEntityBaseType> = GameEngineEntities<T> | GameEngineEntitiesResolver<T>;
