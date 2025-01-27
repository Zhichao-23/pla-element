<script setup lang="ts">
import { omit } from "lodash-es";
import type { IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed } from "vue";

defineOptions({
	name: "pla-icon",
	inheritAttrs: true,
});

const props = withDefaults(defineProps<IconProps>(), {
	icon: "",
	color: "#fff",
	type: "primary",
});
const fontawesomeProps = computed(() => omit(props, ["type", "color"]));
const customStyles = computed(() => ({
	color: props.color,
	class: [`pla-icon--${props.type}`],
}));
</script>

<template>
	<i class="pla-icon" v-bind="customStyles">
		<FontAwesomeIcon v-bind="fontawesomeProps"></FontAwesomeIcon>
	</i>
</template>

<style>
@import "./style.scss";
</style>
