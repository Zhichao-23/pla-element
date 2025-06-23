import type {InjectionKey} from "vue";
import type {RowContext} from "./Row/types.ts";

export const ROW_CXT_KEY: InjectionKey<RowContext> = Symbol("ROW_CXT_KEY");