"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.default = (entities, screen, layout) => {
    if (!entities || !screen || !layout)
        return null;
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
            return (<entity.renderer key={key} screen={screen} layout={layout} {...entity}/>);
    });
};
//# sourceMappingURL=DefaultRenderer.js.map