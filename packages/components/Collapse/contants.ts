import type { InjectionKey } from "vue";
import type { CollapseContext } from "./types";
export const COLLASPES_CTX_KEY: InjectionKey<CollapseContext> =
	Symbol("COLLASPES_CTX_KEY");
