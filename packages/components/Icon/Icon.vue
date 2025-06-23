<script setup lang="ts">
import { omit } from "lodash-es";
import type { IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed } from "vue";
import {useNamespace} from "@pla-element/utils";

defineOptions({
	name: "pla-icon",
	inheritAttrs: true,
});

const ns = useNamespace('icon');

const props = withDefaults(defineProps<IconProps>(), {
	icon: "",
	color: "#fff",
  type: "info"
});
const fontawesomeProps = computed(() => omit(props, ["type", "color"]));
const customStyles = computed(() => ({
	color: props.color,
}));

</script>

<template>
	<i class="pla-icon" v-bind="customStyles" :class="ns.m(type, '')">
		<FontAwesomeIcon v-bind="fontawesomeProps"></FontAwesomeIcon>
	</i>
</template>

<style src="./style.scss"></style>
