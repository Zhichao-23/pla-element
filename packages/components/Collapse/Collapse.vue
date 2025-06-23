<script setup lang="ts">
import { provide, reactive, ref, watch, watchEffect } from "vue";
import type { CollapseEmits, CollapseProps } from "./types";
import { COLLASPES_CTX_KEY } from "./contants";
import {debugWarn, useNamespace} from "@pla-element/utils";
import { filter, indexOf } from "lodash-es";

const COMP_NAME = "PlaCollapse";

defineOptions({
	name: COMP_NAME,
});

const ns = useNamespace('collapse');

const props = withDefaults(defineProps<CollapseProps>(), {
	accordion: false,
});

const emits = defineEmits<CollapseEmits>();

const activeNames = ref(props.modelValue);

watchEffect(() => {
	if (props.accordion && activeNames.value.length > 1) {
		debugWarn(COMP_NAME, "accordion mode just has one item in modelValue");
	}
});

// activeNames一变就执行change
watch(
	() => activeNames.value,
	(newActiveNames) => {
		emits("change", newActiveNames);
	}
);

const updateActiveNames = (newVal: string[]) => {
	activeNames.value = newVal;
};

const handleItemClick = (itemName: string) => {
	// accodiomn mode
	if (props.accordion) {
		if (indexOf(activeNames.value, itemName) !== -1) {
			const newVal = [] as string[];
			updateActiveNames(newVal);
			emits("update:modelValue", newVal);
		} else {
			const newVal = [itemName];
			updateActiveNames(newVal);
			emits("update:modelValue", newVal);
		}
		return;
	}
	// default mode
	const index = indexOf(activeNames.value, itemName);
	if (index == -1) {
		const newVal = [...activeNames.value, itemName];
		updateActiveNames(newVal);
		emits("update:modelValue", newVal);
	} else {
		const newVal = filter(activeNames.value, (name) => name !== itemName);
		updateActiveNames(newVal);
		emits("update:modelValue", newVal);
	}
};

provide(
	COLLASPES_CTX_KEY,
	reactive({
		handleItemClick,
		activeNames,
	})
);

const slots = defineSlots();
</script>

<template>
	<div :class="ns.b()">
		<slot></slot>
	</div>
</template>

<style src="./Collapse.scss"></style>
