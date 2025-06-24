import { GameEngineEntities } from "./GameEngineEntities";
import { GameEngineUpdateEventOptionType } from "./GameEngineUpdateEventOptionType";

export type GameEngineSystem = (
  entities: GameEngineEntities,
  update: GameEngineUpdateEventOptionType
) => GameEngineEntities;
