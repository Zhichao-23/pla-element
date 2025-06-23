import { useNamespace } from "../src/useNamespace.ts";
import { describe, expect, it } from "vitest";

describe("useNamespace", () => {
	const ns = useNamespace("button");
	it("bem-b", () => {
		expect(ns.b()).toBe("pla-button");
	});
	it("bem-e", () => {
		expect(ns.e("icon")).toBe("pla-button__icon");
	});
	it("bem-m", () => {
		expect(ns.m("primary", "")).toBe("pla-button--primary");
	});
	it("bem-is", () => {
		expect(ns.is("disabled")).toBe("is-disabled");
	});
});
