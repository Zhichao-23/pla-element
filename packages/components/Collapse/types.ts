export interface CollapseProps {
	accordion?: boolean;
	modelValue: string | string[];
}

export interface CollapseItemProps {
	name: string;
	title?: string;
	disabled?: boolean;
	icon?: string;
}

export interface CollapseEmits {
	change: [newActiveNames: string | string[]];
	"update:modelValue": [activeNames: string | string[]];
}

export interface CollapseContext {
	handleItemClick: (itemName: string) => void;
	activeNames: string | string[];
}
