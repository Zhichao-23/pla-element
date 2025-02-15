import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { PlaButtonGroup as ButtonGroup } from "..";
import Button from "../Button.vue";
import type { ButtonSize, ButtonType } from "../types";
describe("ButtonGroup.vue", () => {
	it("should have install", () => {
		expect(ButtonGroup.install).toBeDefined();
	});
	it("renders correctly with default props", () => {
		const wrapper = mount(() => (
			<ButtonGroup>
				<Button>1</Button>
				<Button>2</Button>
			</ButtonGroup>
		));
		expect(wrapper.classes()).toContain("pla-button-group");
		expect(wrapper.findAllComponents(Button).length).toBe(2);
	});

	// 测试不同类型按钮的渲染
	it("renders different types", () => {
		const types = [
			"primary",
			"success",
			"info",
			"warning",
			"danger",
		] as ButtonType[];
		types.forEach((type) => {
			const wrapper = mount(ButtonGroup, {
				props: { type },
				slots: {
					default:
						"<pla-button>Button 1</pla-button><pla-button>Button 2</pla-button>",
				},
				global: {
					components: {
						"pla-button": Button,
					},
				},
			});
			const buttons = wrapper.findAllComponents(Button);
			buttons.forEach((button) => {
				console.log(button.classes());

				expect(button.classes()).toContain(`pla-button--${type}`);
			});
		});
	});

	it("render different sizes", () => {
		const sizes: ButtonSize[] = ["default", "small", "large"];
		sizes.forEach((size) => {
			const wrapper = mount(ButtonGroup, {
				props: { size },
				slots: {
					default:
						"<pla-button>Button 1</pla-button><pla-button>Button 2</pla-button>",
				},
				global: {
					components: {
						"pla-button": Button,
					},
				},
			});
			const buttons = wrapper.findAllComponents(Button);
			buttons.forEach((button) => {
				expect(button.classes()).toContain(`pla-button--${size}`);
			});
		});
	});

	it("disables child buttons when disabled is true", () => {
		const wrapper = mount(ButtonGroup, {
			props: {
				disabled: true,
			},
			slots: {
				default:
					"<pla-button>Button 1</pla-button><pla-button>Button 2</pla-button>",
			},
			global: {
				components: {
					"pla-button": Button,
				},
			},
		});
		const buttons = wrapper.findAllComponents(Button);
		buttons.forEach((button) => {
			expect(button.classes()).contains("is-disabled");
			button.trigger("click");
			expect(wrapper.emitted("click")).toBeFalsy();
		});
	});
});
