<script setup lang="ts">
import { watch, ref, useSlots, provide, onBeforeMount } from "vue";
import type { TreeNodeOption, TreeProvide } from "./tree.ts";
import { treeProps } from "./tree.ts"
import type { TreeNode } from "./tree-node.ts";
import ZcTreeNode from "./tree-node.vue";

defineOptions({
	name: "ZcTree",
});

type Key = string | number;
type Tree = TreeNode[];

const props = defineProps(treeProps);

const expandedKeys = ref<Set<Key>>(new Set(props.defaultExpandedKeys))

// 获得格式化器,根据用户传递的字段拿到key,label和children
function getFormatter(node: TreeNodeOption) {
	const key = props.keyField ?? "key";
	const label = props.labelField ?? "label";
	const children = props.childrenField ?? "chilren";
	return {
		getKey() {
			return node[key] as string | number;
		},
		getLabel() {
			return node[label] as string;
		},
		getChildren() {
			return node[children] as TreeNodeOption[];
		},
	};
}
// 建树
const tree = ref<Tree>([]);
onBeforeMount(() => {
	tree.value = createTree(props.data, 0);
});

const createTree = (newRawTree: TreeNodeOption[], level: number) => {
	return newRawTree.map((node) => {
		const formatter = getFormatter(node);
		const treeNode: TreeNode = {
			key: formatter.getKey(),
			label: formatter.getLabel(),
			level: level,
			children: [],
			isLeaf: node.isLeaf,
			isLoading: false,
			onLoad: node.onLoad,
			loaded: node.onLoad ? false : true,
			isExpanded: expandedKeys.value.has(node.key),
			raw: node,
		};
		if (node.children && node.children.length)
			treeNode.children = createTree(node.children, level + 1);
		return treeNode;
	});
};

// 树的建立和更新逻辑
const flattenTree = ref<TreeNode[]>([]);

let activeNodeIndex: number;

onBeforeMount(() => {
	initFlattenTree();
});

watch(expandedKeys.value, () => {
	updateFlattenTree(activeNodeIndex);
});

const initFlattenTree = () => {
	for (let i = 0; i < tree.value.length; i++) {
		const node = tree.value[i];
		flattenTree.value.push(node);
		if (expandedKeys.value.has(node.key)) {
			addTreeNodes(flattenTree.value.length - 1, node);
		}
	}
};

const updateFlattenTree = (index: number) => {
	const activeNode = flattenTree.value[index];
	if (expandedKeys.value.has(activeNode.key)) {
		addTreeNodes(index, activeNode);
	} else {
		deleteTreeNodes(index, activeNode);
	}
};

const addTreeNodes = (index: number, activeNode: TreeNode) => {
	flattenTree.value.splice(index + 1, 0, ...createFlattenTree(activeNode));
};

const deleteTreeNodes = (index: number, activeNode: TreeNode) => {
	flattenTree.value.splice(index + 1, activeNode.children.length);
};

const createFlattenTree = (node: TreeNode) => {
	const flattenTree = [];
	const stack = [];
	for (let i = node.children.length - 1; i >= 0; i--) {
		stack.push(node.children[i]);
	}
	while (stack.length) {
		const node = stack.pop() as TreeNode;
		flattenTree.push(node);
		if (expandedKeys.value.has(node.key)) {
			for (let i = node.children.length - 1; i >= 0; i--) {
				const child = node.children[i];
				stack.push(child);
			}
		}
	}
	return flattenTree;
};

// 树的展开和异步加载逻辑
const handleExpandClicked = async (node: TreeNode) => {
	await handleLoad(node);
	toggle(node);
};

const isloadingKeys = ref(new Set<string | number>([]));

async function handleLoad(node: TreeNode) {
	if (!node.onLoad || node.loaded || isloadingKeys.value.has(node.key)) return;
	node.isLoading = true;
	const children = await node.onLoad();
	node.raw.children = children;
	node.children = createTree(node.raw.children, node.level + 1);
	node.isLoading = false;
	node.loaded = true;
	isloadingKeys.value.delete(node.key);
}


function toggle(node: TreeNode) {
	const index = flattenTree.value.findIndex((item) => {
		return item.key === node.key;
	});
	if (expandedKeys.value.has(node.key)) {
		node.isExpanded = false;
		collapse(node.key);
	} else {
		node.isExpanded = true;
		expand(node.key);
	}
	activeNodeIndex = index;
}

const expand = (key: Key) => {
	expandedKeys.value.add(key);
};

const collapse = (key: Key) => {
	expandedKeys.value.delete(key);
};

// 节点选择逻辑
const seletedKeys = ref(new Set(props.defaultSeletedKeys));
const handleTreeNodeClicked = (node: TreeNode) => {
	if (props.mutipleSelect) {
		multipleSelect(node);
	} else {
		singleSelect(node);
	}
};

const multipleSelect = (node: TreeNode) => {
	if (!seletedKeys.value.has(node.key)) {
		select(node);
	} else {
		withdrawSelect(node);
	}
};

const select = (node: TreeNode) => {
	seletedKeys.value.add(node.key);
};
const withdrawSelect = (node: TreeNode) => {
	seletedKeys.value.delete(node.key);
};

const singleSelect = (node: TreeNode) => {
	seletedKeys.value.clear();
	seletedKeys.value.add(node.key);
};

const slots = useSlots();
provide<TreeProvide>("treeSlots", { slots: slots });
</script>

<template>
	<div>
		<!-- 每个元素必须有一个独一无二的key -->
		<transition-group name="zc-tree" tag="div">
			<template v-for="(node, index) in flattenTree" :key="node.key">
				<zc-tree-node
					:node="node"
					@on-expand-clicked="handleExpandClicked"
					@on-tree-node-clicked="handleTreeNodeClicked"
					:class="{ 'zc-tree-node__selected': seletedKeys.has(node.key) }"
					:style="{ zIndex: index }"
				>
				</zc-tree-node>
			</template>
		</transition-group>
	</div>
</template>

<style scoped>
.zc-tree-node__selected {
	background-color: #f5f7fa;
}

.zc-tree-move {
	transition: 0.5s all ease;
}

.zc-tree-enter-from,
.zc-tree-leave-to {
	opacity: 0;
}
.zc-tree-enter-active {
	transition: all 0.5s ease-in;
}
.zc-tree-leave-active {
	position: absolute;
	transition: all 0.5s ease-out;
}
</style>
