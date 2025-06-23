<script setup lang="ts">
import { onMounted, ref } from "vue"
import { PlaIcon } from "../Icon"

defineOptions({
	name: "PlaLoading",
})
const isLoading = defineModel("isLoading", {
	default: false,
})
const setLoading = (newIsLoading: boolean) => {
	isLoading.value = newIsLoading
}

const text = defineModel<string>("text", {
	default: "",
})
const setText = (newText: string) => {
	text.value = newText
}

const fulllscreen = defineModel("fullscreen", {
	default: false,
})

const setFullscrren = (newFullscreen: boolean) => {
	fulllscreen.value = newFullscreen
}

const oLoadingBox = ref<HTMLDivElement | null>(null)
onMounted(() => {
	if (!oLoadingBox.value) return
})

defineExpose({
	setLoading,
	setText,
	setFullscrren,
})
</script>

<template>
	<transition name="pla-loading">
		<div
			:class="[
				'pla-loading__box',
				{ 'pla-loading__box--fullscreen': fulllscreen },
			]"
			ref="oLoadingBox"
			v-if="isLoading"
		>
			<pla-icon icon='spinner' class="pla-loading__icon"></pla-icon>
			<span>{{ text }}</span>
		</div>
	</transition>
</template>

<style src="./style.scss" scoped>

</style>
