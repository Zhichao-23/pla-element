import type { Meta, StoryObj } from "@storybook/vue3";
import { PlaCollapse, PlaCollapseItem } from "pla-element";
import { ref } from "vue";

const meta: Meta<typeof PlaCollapse> = {
	title: "Components/Collapse",
	component: PlaCollapse,
	tags: ["autodocs"],
	argTypes: {
		accordion: { control: "boolean" },
	},
	args: {
		accordion: false,
	},
};

export default meta;

type Story = StoryObj<typeof PlaCollapse>;

export const Default: Story = {
	render: () => ({
		components: { PlaCollapse, PlaCollapseItem },
		setup() {
			const activeNames = ref<string[]>([]);
			const update = (newActiveNames: string[]) => {
				console.log(newActiveNames);
				activeNames.value = newActiveNames;
			};
			return { update, activeNames };
		},
		template: `
			<PlaCollapse :modelValue="activeNames" @update:modelValue="update">
				<PlaCollapseItem title="Item 1" name="1">Content 1</PlaCollapseItem>
				<PlaCollapseItem title="Item 2" name="2">Content 2</PlaCollapseItem>
				<PlaCollapseItem title="Item 3" name="3">Content 3</PlaCollapseItem>
			</PlaCollapse>
		`,
	}),
};

export const Accordion: Story = {
	args: {
		accordion: true,
	},
	render: (args) => ({
		components: { PlaCollapse, PlaCollapseItem },
		setup() {
			const activeNames = ref<string[]>([]);
			const update = (newActiveNames: string[]) => {
				console.log(newActiveNames);

				activeNames.value = newActiveNames;
			};
			return { update, activeNames, args };
		},
		template: `
			<PlaCollapse :modelValue="activeNames" @update:modelValue="update" :accordion="args.accordion">
				<PlaCollapseItem title="Item 1" name="1">Content 1</PlaCollapseItem>
				<PlaCollapseItem title="Item 2" name="2">Content 2</PlaCollapseItem>
				<PlaCollapseItem title="Item 3" name="3">Content 3</PlaCollapseItem>
			</PlaCollapse>
		`,
	}),
};
