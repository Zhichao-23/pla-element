import type { InjectionKey } from "vue";
import type { SelectContext } from "./type";

export const SELECT_CXT_KEY: InjectionKey<SelectContext> = Symbol('SELECT_CXT_KEY');