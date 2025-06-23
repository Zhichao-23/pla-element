<script setup lang="ts">
import { reactive, toRefs } from "vue";
import type { MessageBoxProps } from "./type"

defineOptions({
	name: "PlaMessageBox",
})

const props = withDefaults(defineProps<MessageBoxProps>(), {
	title: "",
	text: "",
	beforeClose: null,
})

const state = reactive({
	visible: false,
	action: ""
})

const setVisible = (isVisible: boolean) => {
	state.visible = isVisible
}

const handleSurroundingsClicked = () => {
	state.action = "cancel"
}

const handleContentBoxClicked = (event: MouseEvent) => {
	event.stopPropagation()
}

const handleConfirmBtnClicked = () => {
	state.action = "confirm"
}

defineExpose({
	setVisible,
	state,
	beforeClose: props.beforeClose,
})

const { visible } = toRefs(state)
const { title, text } = toRefs(props)
</script>

<template>
	<transition name="zc-message-box">
		<div :class="['zc-message-box']" v-if="visible" @click="handleSurroundingsClicked">
			<div class="zc-message-box__content" @click="handleContentBoxClicked">
				<h3>{{ title }}</h3>
				<p>{{ text }}</p>
				<button @click="handleConfirmBtnClicked">OK</button>
			</div>
		</div>
	</transition>
</template>

<style src="./style.scss">

</style>
