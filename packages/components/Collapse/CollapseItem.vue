<script setup lang="ts">
import { computed, inject } from "vue";
import type { CollapseContext, CollapseItemProps } from "./types";
import { COLLASPES_CTX_KEY } from "./contants";
import { includes, isArray, isEqual } from "lodash-es";
import PlaIcon from "../Icon/Icon.vue";
import expandTransitionEvents from "./expandTransition";

defineOptions({
	name: "pla-collapse-item",
});

const props = withDefaults(defineProps<CollapseItemProps>(), {
	title: "",
	disabled: false,
});

const ctx = inject(COLLASPES_CTX_KEY) as CollapseContext;

const isActive = computed(() => {
	if (isArray(ctx.activeNames)) {
		return includes(ctx.activeNames, props.name);
	} else {
		return isEqual(ctx.activeNames, props.name);
	}
});

const handleClick = () => {
	if (props.disabled) return;
	ctx.handleItemClick(props.name);
};

const slots = defineSlots();
</script>

<template>
	<div
		class="pla-collapse-item"
		:class="{
			'is-disabled': disabled,
			'is-active': isActive,
		}"
	>
		<div class="pla-collapse-item__header" @click="handleClick">
			<span>{{ title }}</span>
			<pla-icon
				:icon="icon"
				size="1x"
				class="pla-collapse-item__icon"
				v-if="icon"
			></pla-icon>
			<pla-icon
				icon="angle-right"
				size="1x"
				class="pla-collapse-item__icon"
				v-else
			></pla-icon>
		</div>
		<transition name="expand" v-on="expandTransitionEvents">
			<div class="pla-collapse__body" v-show="isActive">
				<div class="pla-collapse-item__content" :id="`item-content-${name}`">
					<slot></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

