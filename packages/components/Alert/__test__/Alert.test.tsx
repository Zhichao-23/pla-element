import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/vue";
import { PlaAlert as Alert } from "..";
import { forEach } from "lodash-es";

type Type = "success" | "danger" | "info" | "primary";

function createWrapper(type?: Type) {
	return mount(() => <Alert type={type ?? "primary"}></Alert>);
}

describe("Alert.vue", () => {
	it("should have intsall", () => {
		expect(Alert).toHaveProperty("intsall");
	});
	it("different types", () => {
		const types = ["success", "danger", "info", "primary"] as Type[];
		forEach(types, (type) => {
			expect(createWrapper(type).find(".pla-alert").classes()).toContain(
				`pla-alert--${type}`
			);
		});
	});

	it("should show title when given through props", () => {
		// 使用props
		mount(() => <Alert title={"title"}></Alert>);
		expect(screen.queryByText("title")).toBeDefined();
	});

	it("should show title when given through slots", () => {
		// 使用props
		mount(Alert, {
			slots: {
				title: "title",
			},
		});
		expect(screen.queryByText("title")).toBeDefined();
	});

	it("should show description when given through props", () => {
		mount(() => <Alert>"content"</Alert>);
		expect(screen.queryByText("content")).toBeDefined();
	});

	it("should show title when given through slots", () => {
		// 使用props
		mount(Alert, {
			slots: {
				default: "content",
			},
		});
		expect(screen.queryByText("content")).toBeDefined();
	});

	it("title should be in the center", () => {
		const wrapper = createWrapper();
		expect(wrapper.find(".is-center")).toBeDefined();
	});

	it("icon can not render icon when closabel", () => {
		const wrapper = createWrapper();
		expect(wrapper.find(".pla-alert__close-icon")).toBeDefined();
	});
});
