import { GameEngineEntityOfOptionalType } from "./GameEngineEntity";

export type GameEngineEntities<
  T extends Record<string | number, GameEngineEntityOfOptionalType> = Record<
    string | number,
    GameEngineEntityOfOptionalType
  >
> = T;

export type GameEngineEntitiesResolver = Promise<GameEngineEntities>;

export type GameEngineEntitiesOrResolver =
  | GameEngineEntities
  | GameEngineEntitiesResolver;
