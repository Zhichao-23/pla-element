import type { Placement, Options } from "@popperjs/core";

export interface TooltipProps {
	content?: string;
	trigger?: "hover" | "click";
	placement?: Placement;
	popperOptions?: Options;
	transition?: string;
	showDelay?: number;
	hideDelay?: number;
}

export interface TooltipEmits {
	"visible-change": [value: boolean];
}

export interface TooltipInstance {
	show(): void;
	hide(): void;
}
