import type { PropType } from "vue";
import { computed, defineComponent, Fragment, useTemplateRef } from "vue";
import type { MenuOption } from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import type { TooltipInstance } from "../Tooltip/types";

export default defineComponent({
	name: "pla-dropdown",
	props: {
		menuOptions: {
			type: Array as PropType<MenuOption[]>,
			default: () => [] as MenuOption[],
		},
	},
	emits: ["visible-change", "select"],
	setup(props, { emit, slots, expose }) {
		const itemClick = (item: MenuOption) => {
			if (item.disabled) return;
			emit("select", item);
		};
		const itemList = computed(() =>
			props.menuOptions.map((item) => (
				<Fragment key={item.key}>
					<li
						id={`pla-dropdown__item-${item.key}`}
						class={["pla-dropdown__item", { "is-disabled": item.disabled }]}
						onClick={() => itemClick(item)}
					>
						{item.label}
					</li>
				</Fragment>
			))
		);

		const tooltipProps = computed(() => {
			const { menuOptions: _, ...rest } = props;
			return rest;
		});

		const tooltipInstance = useTemplateRef<TooltipInstance>("tooltipInstance");
		expose<TooltipInstance>({
			show: () => tooltipInstance.value?.show(),
			hide: () => tooltipInstance.value?.hide(),
		});
		return (
			<div class="pla-dropdown">
				<Tooltip {...tooltipProps.value} ref="tooltipInstance">
					{{
						default: () => slots.default && slots.default(),
						content: () => itemList.value,
					}}
				</Tooltip>
			</div>
		);
	},
});
