<script lang="ts">
import { inject, defineComponent, h} from "vue";
import type { PropType } from "vue";
import type { TreeNode } from "./tree-node.ts";
import type { TreeProvide } from "./tree.ts";

export default defineComponent({
	name: "ZcTreeNodeContent",
	props: {
		node: {
			type: Object as PropType<TreeNode>,
			required: true,
		},
	},
	setup(props) {
		const { slots } = inject<TreeProvide>("treeSlots") as TreeProvide;
		return () =>
		// return a vnode
			h(
				"div",
				null,
				slots.default
					? slots.default(props.node)
					: h("span", null, props.node.label)
			);
	},
});
</script>
