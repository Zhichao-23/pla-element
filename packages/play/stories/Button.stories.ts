import type { Meta, StoryObj } from "@storybook/vue3";
import { PlaButton } from "pla-element";

const meta: Meta<typeof PlaButton> = {
	title: "Components/Button",
	component: PlaButton,
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
		icon: {
			control: { type: "text" },
		},
		round: { control: "boolean" },
		circle: { control: "boolean" },
		plain: { control: "boolean" },
		loading: { control: "boolean" },
		disabled: { control: "boolean" },
		useThrottle: { control: "boolean" },
	},
	args: {
		type: "primary",
		size: "default",
		round: true,
		circle: false,
		plain: false,
		loading: false,
		disabled: false,
		useThrottle: true,
	},
};

export default meta;
type Story = StoryObj<typeof PlaButton>;

export const Primary: Story = {
	args: {
		type: "primary",
	},
	render: (args) => ({
		components: { PlaButton },
		setup() {
			const handleClick = (e: Event) => console.log(e);
			return { args, handleClick };
		},
		template:
			'<PlaButton v-bind="args" v-on:click="handleClick">Primary</PlaButton>',
	}),
};

export const Success: Story = {
	args: {
		type: "success",
	},
	render: (args) => ({
		components: { PlaButton },
		setup() {
			const handleClick = (e: Event) => console.log(e);
			return { args, handleClick };
		},
		template:
			'<PlaButton v-bind="args" v-on:click="handleClick">Success</PlaButton>',
	}),
};

export const Info: Story = {
	args: {
		type: "info",
	},
	render: (args) => ({
		components: { PlaButton },
		setup() {
			const handleClick = (e: Event) => console.log(e);
			return { args, handleClick };
		},
		template:
			'<PlaButton v-bind="args" v-on:click="handleClick">Info</PlaButton>',
	}),
};

export const Warning: Story = {
	args: {
		type: "warning",
	},
	render: (args) => ({
		components: { PlaButton },
		setup() {
			const handleClick = (e: Event) => console.log(e);
			return { args, handleClick };
		},
		template:
			'<PlaButton v-bind="args" v-on:click="handleClick">Warning</PlaButton>',
	}),
};

export const Danger: Story = {
	args: {
		type: "danger",
	},
	render: (args) => ({
		components: { PlaButton },
		setup() {
			const handleClick = (e: Event) => console.log(e);
			return { args, handleClick };
		},
		template:
			'<PlaButton v-bind="args" v-on:click="handleClick">Danger</PlaButton>',
	}),
};

export const Loading: Story = {
	args: {
		loading: true,
	},
	render: (args) => ({
		components: { PlaButton },
		setup() {
			const handleClick = (e: Event) => console.log(e);
			return { args, handleClick };
		},
		template:
			'<PlaButton v-bind="args" v-on:click="handleClick">Loading</PlaButton>',
	}),
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	render: (args) => ({
		components: { PlaButton },
		setup() {
			const handleClick = (e: Event) => console.log(e);
			return { args, handleClick };
		},
		template:
			'<PlaButton v-bind="args" v-on:click="handleClick">Disabled</PlaButton>',
	}),
};
