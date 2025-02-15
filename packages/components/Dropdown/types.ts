import type { VNode } from "vue";
import type { TooltipEmits, TooltipProps } from "../Tooltip/types";

export interface DropdownProps extends TooltipProps {
	menuOptions?: MenuOption[];
}

export interface DropdownEmits extends TooltipEmits {
	select: [item: MenuOption];
}

export interface MenuOption {
	label?: string | VNode;
	key: any;
	disabled?: boolean;
	divided?: boolean;
}
