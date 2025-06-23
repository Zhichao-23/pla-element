<script setup lang="ts">
import type { AlertEmits, AlertProps } from "./types";
import PlaIcon from "../Icon/Icon.vue";
import { computed, ref, useTemplateRef } from "vue";
import { typeIconMap } from "@pla-element/utils";
import { useNamespace } from "@pla-element/utils/src/useNamespace";

defineOptions({
	name: "PlaAlert",
});
const ns = useNamespace("alert");
const visible = ref<boolean>(true);

const props = withDefaults(defineProps<AlertProps>(), {
	type: "success",
	closable: true,
	effect: "light",
	center: false,
	showIcon: false,
});

const emits = defineEmits<AlertEmits>();

const iconName = computed(() => typeIconMap.get(props.type));

const slots = defineSlots();

const hasDesc = computed(() => !!slots.default || !!props.description);

const descriptionStyle = computed(() => {
	return {
		margin: props.title ? '14px 0 0' : '0px'
	};
});

const handleClose = (e: MouseEvent) => {
	visible.value = false;
	emits("close", e);
};

const _ref = useTemplateRef<HTMLElement | null>("alert");
defineExpose({
	ref: _ref,
	visible
});
</script>

<template>
	<transition>
		<div :class="[
			ns.b(),
			ns.is(effect),
			ns.m(type, ''),
			{
				[ns.is('center')]: center
			}]" v-if="visible">
			<pla-icon :icon="iconName" size="3x" :style="{ marginRight: '10px' }" :type="type" v-if="showIcon"></pla-icon>
			<div :class="ns.e('content')">
				<span :class="ns.e('title')">
					<slot name="title">
						{{ title }}
					</slot>
				</span>
				<p :class="ns.e('description')" v-if="hasDesc" :style="descriptionStyle">
					<slot>
						{{ description }}
					</slot>
				</p>
			</div>
			<pla-icon icon="xmark" size="1x" @click.stop="handleClose" :class="ns.e('close-icon')" :type="type"
				v-if="closable"></pla-icon>
		</div>
	</transition>
</template>

<style src="./style.scss"></style>
