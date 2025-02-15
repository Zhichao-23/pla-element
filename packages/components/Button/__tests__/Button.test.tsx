import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { PlaButton as Button } from "..";
import type { ButtonSize, ButtonType } from "../types";

describe("Button.vue", () => {
	it("should have install", () => {
		expect(Button.install).toBeDefined();
	});
	// 测试默认属性渲染
	it("renders correctly with default props", () => {
		const wrapper = mount(Button);
		expect(wrapper.classes()).toContain("pla-button");
		expect(wrapper.classes()).toContain("pla-button--primary");
		expect(wrapper.classes()).toContain("is-round");
	});

	// 测试不同类型按钮的渲染
	it("renders correctly with different types", () => {
		const types = [
			"primary",
			"success",
			"info",
			"warning",
			"danger",
		] as ButtonType[];
		types.forEach((type) => {
			const wrapper = mount(Button, {
				props: { type },
			});
			expect(wrapper.classes()).toContain(`pla-button--${type}`);
		});
	});

	// 测试不同尺寸按钮的渲染
	it("renders correctly with different sizes", () => {
		const sizes = ["large", "small", "default"] as ButtonSize[];
		sizes.forEach((size) => {
			const wrapper = mount(Button, {
				props: { size },
			});
			expect(wrapper.classes()).toContain(`pla-button--${size}`);
		});
	});

	// 测试特殊属性（round, circle, plain, disabled）的渲染
	it("renders correctly with round, circle, plain, and disabled props", () => {
		const wrapper = mount(Button, {
			props: { round: true, circle: true, plain: true, disabled: true },
		});
		expect(wrapper.classes()).toContain("is-round");
		expect(wrapper.classes()).toContain("is-circle");
		expect(wrapper.classes()).toContain("is-plain");
		expect(wrapper.classes()).toContain("is-disabled");
	});

	// 测试点击事件触发
	it("emits click event", async () => {
		const wrapper = mount(Button);
		await wrapper.find("button").trigger("click");
		expect(wrapper.emitted()).toHaveProperty("click");
	});

	// 测试节流功能
	it("handles click event with throttling", async () => {
		vi.useFakeTimers();

		const handleClick = vi.fn();
		const wrapper = mount(() => (
			<Button
				useThrottle={true}
				throttleDuration={500}
				onClick={handleClick}
			></Button>
		));

		await wrapper.trigger("click");
		expect(handleClick).toBeCalledTimes(1);
		vi.advanceTimersByTime(300);
		await wrapper.trigger("click");
		expect(handleClick).toBeCalledTimes(1);
		vi.advanceTimersByTime(300);
		await wrapper.trigger("click");
		expect(handleClick).toBeCalledTimes(2);

		vi.useRealTimers();
	});

	// 测试 loading 状态
	it("renders loading icon when loading is true", () => {
		const wrapper = mount(Button, {
			props: { loading: true },
		});
		expect(wrapper.findComponent({ name: "PlaIcon" }).exists()).toBe(true);
	});
});
