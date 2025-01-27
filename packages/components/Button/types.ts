import type { ShallowRef } from "vue";

export type ButtonType = "primary" | "success" | "info" | "warning" | "danger";

export type ButtonSize = "large" | "small" | "default";

export type NativeType = "button" | "submit" | "reset";

export interface ButtonProps {
	type?: ButtonType;
	size?: ButtonSize;
	nativeType?: NativeType;
	disabled?: boolean;
	tag?: string;
	loading?: boolean;
	icon?: string;
	circle?: boolean;
	plain?: boolean;
	round?: boolean;
	loadingIcon?: string;
	autofocus?: boolean;
	useThrottle?: boolean;
	throttleDuration?: number;
}

export interface ButtonEmits {
	click: [evt: MouseEvent];
}

export interface ButtonInstance {
	ref: ShallowRef<HTMLElement | null>;
}

export interface ButtonGroupProps {
	size?: ButtonSize;
	type?: ButtonType;
	disabled?: boolean;
}

export interface ButtonGroupContext {
	size?: ButtonSize;
	type?: ButtonType;
	disabled?: boolean;
}
