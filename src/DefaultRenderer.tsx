import React from "react";
import { GameRenderer } from "./types/GameRenderer";
import { GameEngineEntities } from "./types/GameEngineEntities";
import { LayoutRectangle, ScaledSize } from "react-native";

export default (
  entities: GameEngineEntities,
  screen: ScaledSize,
  layout: LayoutRectangle
) => {
  if (!entities || !screen || !layout) return null;

  return Object.keys(entities)
    .filter((key) => entities[key].renderer)
    .map((key) => {
      const entity = entities[key];
      //// TODO: Review when this is a valid scenario - this may be BREAKING
      // if (typeof entity.renderer === "object")
      //   return (
      //     <entity.renderer.type
      //       key={key}
      //       screen={screen}
      //       layout={layout}
      //       {...entity}
      //     />
      //   );
      // else 
      if (typeof entity.renderer === "function")
        return (
          <entity.renderer
            key={key}
            screen={screen}
            layout={layout}
            {...entity}
          />
        );
    });
};
