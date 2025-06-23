import type { VNode } from "vue";
import type { TooltipEmits, TooltipProps } from "../Tooltip/types";

export interface DropdownProps extends TooltipProps {
	menuOptions?: MenuOption[];
	disabled?: boolean;
}

export interface DropdownEmits extends TooltipEmits {
	select: [item: MenuOption];
}

export interface MenuOption {
	key: any;
	label?: string | VNode;
	disabled?: boolean;
	divided?: boolean;
}
