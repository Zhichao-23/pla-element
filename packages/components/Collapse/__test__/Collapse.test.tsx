import { expect, it, describe } from "vitest";
import { mount } from "@vue/test-utils";
import { PlaCollapse as Collapse, PlaCollapseItem as CollapseItem } from "..";

function createWrapper() {
	return mount(() => (
		<Collapse modelValue={["1"]}>
			<CollapseItem name="1"></CollapseItem>
			<CollapseItem name="2"></CollapseItem>
		</Collapse>
	));
}

describe("Collapse", () => {
	it("should have install", () => {
		expect(Collapse.install).toBeDefined();
	});

	it("item1 expand defaultly", () => {
		const wrapper = createWrapper();
		expect(wrapper.findAllComponents(CollapseItem)[0].classes()).toContain(
			"is-active"
		);
	});

	it("item2 should expand when clicked", async () => {
		const wrapper = createWrapper();
		const titles = wrapper.findAll(".pla-collapse-item__header");
		const items = wrapper.findAllComponents(CollapseItem);
		await titles[1].trigger("click");
		expect(items[1].classes()).contain("is-active");
	});

	it("should expand only one when accordion mode", async () => {
		const wrapper = mount(() => (
			<Collapse modelValue={["1"]} accordion>
				<CollapseItem name="1"></CollapseItem>
				<CollapseItem name="2"></CollapseItem>
			</Collapse>
		));
		const titles = wrapper.findAll(".pla-collapse-item__header");
		await titles[1].trigger("click");
		expect(wrapper.findAll(".is-active")).toHaveLength(1);
	});

	it("item2 is disabled", () => {
		const wrapper = mount(() => (
			<Collapse modelValue={["1"]} accordion>
				<CollapseItem name="1"></CollapseItem>
				<CollapseItem name="2" disabled></CollapseItem>
			</Collapse>
		));
		const items = wrapper.findAllComponents(CollapseItem);
		expect(items[1].classes()).toContain("is-disabled");
	});
});
