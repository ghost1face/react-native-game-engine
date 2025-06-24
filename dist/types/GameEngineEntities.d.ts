import { GameEngineEntity } from "./GameEngineEntity";
export type GameEngineEntities = Record<string | number, GameEngineEntity>;
export type GameEngineEntitiesResolver = Promise<GameEngineEntities>;
export type GameEngineEntitiesOrResolver = GameEngineEntities | GameEngineEntitiesResolver;
