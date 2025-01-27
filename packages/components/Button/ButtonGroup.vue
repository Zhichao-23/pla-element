<script setup lang="ts">
import { provide, reactive, toRef } from "vue";
import { BUTTON_GROUP_CXT_KEY } from "./constants";
import type { ButtonGroupContext, ButtonGroupProps } from "./types";

defineOptions({
	name: "pla-button-group",
});

const props = defineProps<ButtonGroupProps>();

const context: ButtonGroupContext = reactive({
	size: toRef(props.size),
	type: toRef(props.type),
	disabled: toRef(props.disabled),
});

provide(BUTTON_GROUP_CXT_KEY, context);

const slots = defineSlots();
</script>

<template>
	<div class="pla-button-group">
		<slot></slot>
	</div>
</template>

<style lang="scss">
@import "./style.scss";
</style>
