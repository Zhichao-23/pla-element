<script lang="ts" setup>
import { computed, inject, useTemplateRef } from "vue";
import { throttle } from "lodash-es";
import PlaIcon from "../Icon/Icon.vue";
import { BUTTON_GROUP_CXT_KEY } from "./constants";
import type {
	ButtonProps,
	ButtonEmits,
	ButtonInstance,
	ButtonGroupContext,
} from "./types";
import { useNamespace } from "@pla-element/utils";

defineOptions({
	name: "PlaButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
	type: "primary",
	size: "default",
	disabled: false,
	nativeType: "button", // 原生的type属性
	round: true,
	tag: "button",
	useThrottle: true,
	throttleDuration: 500,
	// 补充可能缺少的 props
	loading: false,
	autofocus: false,
});

const ns = useNamespace("button");

const emits = defineEmits<ButtonEmits>();
const handleClick = (evt: MouseEvent) => emits("click", evt);
const handleClickThrottle = throttle(handleClick, props.throttleDuration, {
	trailing: false, // 延迟结束后是否执行一次
});

const slots = defineSlots();

const _ref = useTemplateRef<HTMLElement | null>("button");

const cxt = inject<ButtonGroupContext | null>(BUTTON_GROUP_CXT_KEY, null);

const iconStyle = computed(() => ({
	marginRight: slots.default && !cxt ? "8px" : "0px",
}));

const type = computed(() => cxt?.type ?? props.type);
const size = computed(() => cxt?.size ?? props.size);
const disabled = computed(() => cxt?.disabled ?? props.disabled);

defineExpose<ButtonInstance>({
	ref: _ref,
});
</script>

<template>
	<component :is="props.tag" ref="button" class="pla-button" :type="props.tag == 'button' ? props.nativeType : void 0"
		:disabled="disabled || props.loading ? true : void 0" :autofocus="autofocus" :class="[
			`${ns.m(type, '')}`,
			`${ns.m(size, '')}`,
			{
				[`${ns.is('plain')}`]: plain,
				[`${ns.is('round')}`]: round,
				[`${ns.is('circle')}`]: circle,
				[`${ns.is('disabled')}`]: disabled,
				[`${ns.is('loading')}`]: loading,
			},
		]" @click="(evt: MouseEvent) => { props.useThrottle ? handleClickThrottle(evt) : handleClick(evt) }">
		<template v-if="props.loading">
			<slot name="loading">
				<pla-icon :icon="props.icon ?? 'spinner'" :style="iconStyle" size="1x"
					:class="{ [`${ns.e('Loading-icon')}`]: loading }" />
			</slot>
		</template>
		<pla-icon v-if="!props.loading && props.icon" :icon="props.icon" :style="iconStyle" size="1x" />
		<slot></slot>
	</component>
</template>

<style src="./style.scss"></style>
