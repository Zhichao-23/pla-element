import type { InjectionKey } from "vue";
import type { ButtonGroupContext } from "./types";

const BUTTON_GROUP_CXT_KEY: InjectionKey<ButtonGroupContext> = Symbol(
	"BUTTON_GROUP_CXT_KEY"
);

export { BUTTON_GROUP_CXT_KEY };
