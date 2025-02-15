import { defineComponent, h, Text, type PropType, type VNode } from "vue";

export default defineComponent({
	name: "render-vnode",
	props: {
		vnode: {
			type: [String, Object] as PropType<string | VNode>,
			required: true,
		},
	},
	setup: (props) => {
		return () => {
			if (typeof props.vnode == "string") {
				return h(Text, props.vnode);
			}
			return props.vnode;
		};
	},
});
