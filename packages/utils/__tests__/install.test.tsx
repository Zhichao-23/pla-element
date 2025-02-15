import { describe, it, expect } from "vitest";
import { makeInstaller, withInstall } from "../src/install";
import { createApp, defineComponent } from "vue";

const app = defineComponent({
	name: "app",
	render: () => (
		<div>
			<comp1 /> <comp2 />
		</div>
	),
});

const comp1 = withInstall(
	defineComponent({
		name: "comp1",
		render: () => <div id="comp1"></div>,
	})
);

const comp2 = withInstall(
	defineComponent({
		name: "comp2",
		render: () => <div id="comp2"></div>,
	})
);

describe("withInstall", () => {
	it("withInstall", () => {
		const instance = createApp(app).use(comp1).use(comp2);
		expect(instance._context.components).toEqual({ comp1, comp2 });
	});

	it("makeInstaller", () => {
		const instance = createApp(app).use(makeInstaller([comp1, comp2]));
		expect(instance._context.components).toEqual({ comp1, comp2 });
	});
});
