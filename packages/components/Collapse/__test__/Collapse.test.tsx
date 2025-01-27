import { mount, VueWrapper } from "@vue/test-utils";
import { beforeEach, it, describe, expect, vi } from "vitest";
import Collapse from "../Collapse.vue";
import CollapseItem from "../CollapseItem.vue";
import { ref, type ComponentPublicInstance } from "vue";

describe("Collaspe", () => {
	let wrapper: VueWrapper<ComponentPublicInstance>;
	let useAccordion = false;
	const handleChange = vi.fn();
	const update = (newActiveNames: string[] | string) => {
		activeNames.value = newActiveNames;
	};
	const activeNames = ref<string[] | string>([]);
	beforeEach(() => {
		wrapper = mount(() => (
			<Collapse
				onChange={handleChange}
				modelValue={activeNames.value}
				onUpdate:modelValue={update}
				accordion={useAccordion}
			>
				<CollapseItem name={"a"}></CollapseItem>
				<CollapseItem name={"b"}></CollapseItem>
				<CollapseItem name={"c"} disabled></CollapseItem>
			</Collapse>
		));
	});

	it("CollaspeItems should be rendered properly", () => {
		expect(wrapper.findAllComponents(CollapseItem).length).toBe(3);
		expect(
			wrapper
				.findComponent({ name: "pla-collapse-item", props: { disabled: true } })
				.exists()
		).toBe(true);
	});

	it("The CollaspeItem clicked should expand", async () => {
		const items = wrapper.findAllComponents(CollapseItem);
		const firstHeader = items[0].find(".pla-collapse-item__header");

		await firstHeader.trigger("click");
		expect(activeNames.value).toEqual(["a"]);
		expect(handleChange).toHaveBeenCalledWith(["a"]);
	});

	useAccordion = true;
	it("Accordions should be expanded properly", async () => {
		const items = wrapper.findAllComponents(CollapseItem);
		const firstHeader = items[0].find(".pla-collapse-item__header");
		const secondHeader = items[1].find(".pla-collapse-item__header");

		await secondHeader.trigger("click");
		expect(activeNames.value).toEqual("b");
		expect(handleChange).toHaveBeenCalledWith("b");

		await firstHeader.trigger("click");
		expect(activeNames.value).toEqual("a");
		expect(handleChange).toHaveBeenCalledWith("a");
	});
});
