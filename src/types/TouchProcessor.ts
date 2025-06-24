import { TouchProcessorApi } from "./TouchProcessorApi";
import { TouchEvent } from "./TouchEvent";

export type TouchProcessor = (touches: TouchEvent[]) => TouchProcessorApi;
