import type { ExtractPublicPropTypes, PropType, Slots } from "vue";
// 用户传递的树节点
export interface TreeNodeOption {
	label?: string;
	key: number | string;
	children?: TreeNodeOption[];
	// 异步加载
	onLoad?: () => Promise<TreeNodeOption[]>;
	isLeaf: boolean;
	// 用户可能不按照上面字段传数据
	[key: string]: unknown;
}

// 树的Props
export const treeProps = {
	data: {
		type: Array as PropType<TreeNodeOption[]>,
		default: () => [],
	},
	labelField: {
		type: String,
		default: "label",
	},
	keyField: {
		type: String,
		default: "key",
	},
	childrenField: {
		type: String,
		default: "Children",
	},
	defaultExpandedKeys: {
		type: Array<number | string>,
		default: () => [],
	},
	defaultSeletedKeys: {
		type: Array<number | string>,
		default: () => [],
	},
	mutipleSelect: {
		type: Boolean,
		default: false,
	},
};

// 供用户定义树Props的类型
export type TreeProps = ExtractPublicPropTypes<typeof treeProps>;

// provide的类型
export interface TreeProvide {
	slots: Slots;
}
