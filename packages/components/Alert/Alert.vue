<script setup lang="ts">
import type { AlertEmits, AlertProps } from "./types";
import PlaIcon from "../Icon/Icon.vue";
import { computed, ref, useTemplateRef } from "vue";
import { typeIconMap } from "@pla-element/utils";

defineOptions({
	name: "pla-alert",
});

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

<template v-if="visible" name="pla-alert">
	<transition>
		<div
			class="pla-alert"
			:class="[
				`is-${effect}`,
				`pla-alert--${type}`,
				{
					'is-center': center,
				},
			]"
			v-if="visible"
		>
			<pla-icon
				:icon="iconName"
				size="3x"
				:style="{ marginRight: '10px' }"
				v-if="showIcon"
			></pla-icon>
			<div class="pla-alert__content">
				<span class="pla-alert__title">
					<slot name="title">
						{{ title }}
					</slot>
				</span>
				<p class="pla-alert__description" v-if="hasDesc">
					<slot>
						{{ description }}
					</slot>
				</p>
			</div>
			<pla-icon
				icon="xmark"
				size="1x"
				@click.stop="handleClose"
				class="pla-alert__close-icon"
				v-if="closable"
			></pla-icon>
		</div>
	</transition>
</template>

<style src="./style.scss"></style>
