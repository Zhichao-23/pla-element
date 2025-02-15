import type { Meta, StoryObj } from "@storybook/vue3";
import { PlaButton, PlaButtonGroup } from "pla-element";

const meta: Meta<typeof PlaButtonGroup> = {
	title: "Components/ButtonGroup",
	component: PlaButtonGroup,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["primary", "success", "info", "warning", "danger"],
		},
		size: {
			control: { type: "select" },
			options: ["large", "small", "default"],
		},
		disabled: { control: "boolean" },
	},
	args: {
		type: "primary",
		size: "default",
		disabled: false,
	},
};

export default meta;
type Story = StoryObj<typeof PlaButtonGroup>;

export const Types: Story = {
	args: {
		type: "success",
		size: "small",
	},
	render(args) {
		return {
			components: { PlaButton, PlaButtonGroup },
			setup() {
				return { args };
			},
			template: `<PlaButtonGroup v-bind="args">
				<PlaButton>1</PlaButton>
				<PlaButton>2</PlaButton>
				<PlaButton>3</PlaButton>
			</PlaButtonGroup>`,
		};
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		type: "danger",
	},
	render(args) {
		return {
			components: { PlaButton, PlaButtonGroup },
			setup() {
				return { args };
			},
			template: `<PlaButtonGroup v-bind="args">
				<PlaButton>1</PlaButton>
				<PlaButton>2</PlaButton>
				<PlaButton>3</PlaButton>
			</PlaButtonGroup>`,
		};
	},
};
