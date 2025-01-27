<script setup lang="ts">
import { provide, reactive, toRef, watch, watchEffect } from "vue";
import type { CollapseEmits, CollapseProps } from "./types";
import { isArray } from "lodash-es";
import { COLLASPES_CTX_KEY } from "./contants";

defineOptions({
	name: "pla-collapse",
});

const props = withDefaults(defineProps<CollapseProps>(), {
	accordion: false,
});

const emits = defineEmits<CollapseEmits>();

// activeNames和modelValue已经同步，不需要使用watch侦听
const activeNames = toRef(props, "modelValue");

watchEffect(() => {
	if (props.accordion && isArray(activeNames)) {
		console.warn(
			"[pla-collapse]",
			"modelvalue should be an string in accordion mode"
		);
	}
});

// activeNames一变就执行change
watch(
	() => activeNames.value,
	(newActiveNames) => {
		emits("change", newActiveNames);
	}
);

const handleItemClick = (itemName: string) => {
	if (props.accordion) emits("update:modelValue", itemName);
	else {
		if (!isArray(activeNames.value)) return;
		const index = activeNames.value.indexOf(itemName);
		console.log(index);
		if (index == -1) {
			emits("update:modelValue", [...activeNames.value, itemName]);
		} else {
			const _newActiveNames = activeNames.value.filter(
				(name) => name !== itemName
			);
			emits("update:modelValue", _newActiveNames);
		}
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
	<div class="pla-collapse">
		<slot></slot>
	</div>
</template>

<style>
@import "./style.scss";
</style>
