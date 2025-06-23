<script setup lang="ts">
import { computed, inject } from "vue";
import type { CollapseContext, CollapseItemProps } from "./types";
import { COLLASPES_CTX_KEY } from "./contants";
import { includes } from "lodash-es";
import PlaIcon from "../Icon/Icon.vue";
import expandTransitionEvents from "./expandTransition";
import {useNamespace} from "@pla-element/utils";

defineOptions({
	name: "PlaCollapseItem",
});

const ns = useNamespace('collapse-item');

const props = withDefaults(defineProps<CollapseItemProps>(), {
	title: "",
	disabled: false,
});

const ctx = inject(COLLASPES_CTX_KEY) as CollapseContext;

const isActive = computed(() => {
	return includes(ctx.activeNames, props.name);
});

const handleClick = () => {
	if (props.disabled) return;
	ctx.handleItemClick(props.name);
};

const slots = defineSlots();
</script>

<template>
	<div
    :class="[
      `${ns.b()}`,
      {
      [ns.is('disabled')]: disabled,
      [ns.is('active')]: isActive,
      }]">
		<div :class="ns.e('header')" @click="handleClick">
			<slot name="title">{{ title }}</slot>
			<pla-icon :icon="icon" :class="ns.e('left-icon')" v-if="icon"></pla-icon>
			<pla-icon icon="angle-right" :class="ns.e('right-icon')" size="2xs" v-else></pla-icon>
		</div>
		<transition name="expand" v-on="expandTransitionEvents">
			<div :class="ns.e('body')" v-show="isActive">
				<div :class="ns.e('content')" :id="`item-content-${name}`">
					<slot></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<style src="./CollapseItem.scss"></style>
