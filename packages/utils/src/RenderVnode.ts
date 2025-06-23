import { defineComponent, h, Text, type PropType, type VNode } from 'vue';

export const RenderVnode =  defineComponent({
	name: "render-vnode",
	props: {
		vnode: {
			type: [String, Object] as PropType<string | VNode>,
		},
	},
	setup: (props, {slots}) => {
		return () => {
			if (typeof props.vnode == "string") {
				return h(Text, props.vnode);
			}
			if (slots.default) {
				return slots.default();
			}
			console.error('no vnode');
			return null;
		};
	}
});
