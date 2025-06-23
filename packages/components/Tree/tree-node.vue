<script setup lang="ts">
import { computed, inject } from 'vue';
import { treeNodeProps, treeNodeEmits, type TreeNode } from "./tree-node.ts";
import ZcTreeNodeContent from "./tree-node-content.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCaretRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import type { TreeProvide } from "./tree.ts";

defineOptions({
	name: "zc-tree-node",
});
const props = defineProps(treeNodeProps);
const emits = defineEmits(treeNodeEmits);

// 点击图标
function onExpandClicked(e: MouseEvent) {
	e.stopPropagation();
	emits("onExpandClicked", props.node);
}
// 点击节点身体
function onTreeNodeClicked() {
	emits("onTreeNodeClicked", props.node);
}

const showWhichIcon = (node: TreeNode) => {
	if (node.loaded) return faCaretRight;
	return node.isLoading ? faSpinner : faCaretRight;
};

// 根据层级,确定节点的左外边距
const marginleft = computed(() => {
	const margin = props.node.level * 40;
	return margin;
});

const { slots } = inject("treeSlots") as TreeProvide;
</script>

<template>
	<div
		class="zc-tree-node"
		:style="{ marginLeft: marginleft + 'px' }"
		@click="onTreeNodeClicked"
	>
		<font-awesome-icon
			:icon="showWhichIcon(node)"
			v-if="!props.node?.isLeaf"
			@click="onExpandClicked"
			class="zc-tree-node__icon"
			:class="{
				'zc-tree-node--expanded': props.node.isExpanded,
				'zc-tree-node__icon--loading':
					!props.node.loaded && props.node.isLoading,
			}"
		/>
		<zc-tree-node-content
			:node="props.node"
			v-if="slots.default"
		></zc-tree-node-content>
		<span v-else>{{ props.node?.label }}</span>
	</div>
</template>

<style scoped>
@keyframes loading {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
.zc-tree-node {
	display: flex;
	align-items: center;
	position: relative;
	&:hover {
		cursor: pointer;
		background-color: #f5f7fa;
	}
}
.zc-tree-node__icon {
	padding: 0 5px 0 5px;
	transition: 0.2s transform ease-in;
	&:hover {
		cursor: pointer;
	}
	&.zc-tree-node__icon--loading {
		animation: loading 1s linear infinite;
	}
}
.zc-tree-node__label {
	margin-left: 20%;
}
.zc-tree-node--expanded {
	transform: rotate(90deg);
}
</style>
