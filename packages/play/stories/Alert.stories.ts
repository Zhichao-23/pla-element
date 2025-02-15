import type { Meta, StoryObj } from "@storybook/vue3";
import { PlaAlert } from "pla-element";

const meta: Meta<typeof PlaAlert> = {
	title: "Components/Alert",
	component: PlaAlert,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["success", "info", "warning", "danger"],
		},
	},
	args: {
		type: "info",
	},
};

export default meta;
type Story = StoryObj<typeof PlaAlert>;

export const Default: Story = {
	args: {
		type: "danger",
	},
	render: (args) => ({
		components: { PlaAlert },
		setup() {
			return { args };
		},
		template: `<PlaAlert v-bind="args">
			<template v-slot:title>
				abc
			</template>
		</PlaAlert>`,
	}),
};

export const WithDescription: Story = {
	args: {
		type: "danger",
	},
	render: (args) => ({
		components: { PlaAlert },
		setup() {
			return { args };
		},
		template: `<PlaAlert v-bind="args" :show-icon="true">
			<template v-slot:title>
				abc
			</template>
			Alert
		</PlaAlert>`,
	}),
};
