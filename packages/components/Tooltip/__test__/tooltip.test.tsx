import { beforeEach, describe, expect, it, vi } from "vitest";
import { PlaToopTip as Tooltip } from "../index";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";

describe("tooltip", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});
	it("should have install", () => {
		expect(Tooltip.install).toBeDefined();
		console.log(Tooltip.install);
	});

	it("should render popper when clicked", async () => {
		const wrapper = mount(() => (
			<Tooltip trigger="click">
				<button>trigger</button>
			</Tooltip>
		));
		wrapper.find(".pla-tooltip__trigger").trigger("click");
		expect(wrapper.find(".pla-tooltip__popper").exists()).toBe(false);

		await wrapper.find(".pla-tooltip__trigger").trigger("click");
		expect(wrapper.find(".pla-tooltip__popper").exists()).toBe(false);

		vi.runAllTimers();
		await wrapper.find(".pla-tooltip__trigger").trigger("click");
		expect(wrapper.find(".pla-tooltip__popper").exists()).toBe(true);
	});

	it("should toggle trigger mode", async () => {
		const trigger = ref<"hover" | "click">("hover");
		const wrapper = mount(() => (
			<Tooltip trigger={trigger.value}>
				<button>trigger</button>
			</Tooltip>
		));

		// 初始为 hover 模式，鼠标进入应显示 Tooltip
		await wrapper.find(".pla-tooltip__trigger").trigger("mouseenter");
		vi.runAllTimers();
		expect(wrapper.find(".pla-tooltip__popper").exists()).toBe(true);

		// 清理：鼠标离开关闭 Tooltip
		await wrapper.find(".pla-tooltip__trigger").trigger("mouseleave");
		vi.runAllTimers();
		expect(wrapper.find(".pla-tooltip__popper").exists()).toBe(false);

		// 切换为 click 模式
		trigger.value = "click";
		await nextTick(); // 等待 Vue 更新 DOM

		// 鼠标进入不应再触发显示
		await wrapper.find(".pla-tooltip__trigger").trigger("mouseenter");
		vi.runAllTimers();
		expect(wrapper.find(".pla-tooltip__popper").exists()).toBe(false);

		// 点击应显示 Tooltip
		await wrapper.find(".pla-tooltip__trigger").trigger("click");
		vi.runAllTimers();
		expect(wrapper.find(".pla-tooltip__popper").exists()).toBe(true);

		// 再次点击应关闭 Tooltip
		await wrapper.find(".pla-tooltip__trigger").trigger("click");
		vi.runAllTimers();
		expect(wrapper.find(".pla-tooltip__popper").exists()).toBe(false);
	});
});
