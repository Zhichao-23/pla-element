import { type App, createApp, type DirectiveBinding } from "vue"
import type { LoadingOptions } from "./loading.ts"
import loading from "./loading.vue"

interface LoadingBinding extends DirectiveBinding {
	value: LoadingOptions
}

type LoadingInstance = InstanceType<typeof loading>

type Pair = [App, LoadingInstance]

const loadingMap = new Map<symbol, Pair>()

declare global {
	interface HTMLElement {
		loadingSymbol: symbol
	}
}

export const vLoading = {
	mounted(el: HTMLElement, binding: LoadingBinding) {
		createLoading(el, binding)
	},
	updated(el: HTMLElement, binding: LoadingBinding) {
		updateLoading(el, binding)
	},
	unmounted(el: HTMLElement) {
		const [app] = loadingMap.get(el.loadingSymbol) as Pair
		app.unmount()
	},
}

const createLoading = (el: HTMLElement, binding: LoadingBinding) => {
	const loadingOptions = buildOptions(binding)
	const app = createApp(loading, loadingOptions)
	const instance = app.mount(el)

	el.style.position = "relative"

	const pair = [app, instance] as Pair
	const symbol = Symbol("loading")
	el.loadingSymbol = symbol
	loadingMap.set(symbol, pair)

	return pair
}

const updateLoading = (el: HTMLElement, binding: LoadingBinding) => {
	const pair = loadingMap.get(el.loadingSymbol) as Pair
	const options = buildOptions(binding)
	updateLoadingState(pair[1], options)
}

const buildOptions = (binding: LoadingBinding) => {
	const fullscreen = binding.modifiers.fullscreen || binding.value.fullscreen
	const loadingOptions: LoadingOptions = {
		isLoading: binding.value.isLoading,
		text: binding.value.text,
		fullscreen: fullscreen,
	}
	return loadingOptions
}

const updateLoadingState = (
	instacne: LoadingInstance,
	options: LoadingOptions
) => {
	instacne.setLoading(options.isLoading || false)
	instacne.setText(options.text || "")
	instacne.setFullscrren(options.fullscreen || false)
}
