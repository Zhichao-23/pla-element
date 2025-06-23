import { type App, createApp, watch } from "vue"
import MessageBoxComponent from "./MessageBox.vue"
import type { MessageBoxProps } from "./type"

export type MessageBoxInstance = InstanceType<typeof MessageBoxComponent>

type Resolve = (value: unknown) => void
type Reject = Resolve

export const MessageBox = (options: MessageBoxProps) => {
	const [compInstance, app] = createMessageBox(options)
	showMessageBox(compInstance)

	return new Promise((resolve, reject) => {
		watch(compInstance.state, async () => {
			const { action, visible } = compInstance.state
      // 只有action有值，并且visible为true时才触发
			if (!action || !visible) return

			const { beforeClose } = compInstance
			if (beforeClose) {
				beforeClose(action, compInstance, async () => {
					removeMessageBox(compInstance, app, resolve, reject, action)
				})
			} else {
				removeMessageBox(compInstance, app, resolve, reject, action)
			}
		})
	})
}

export default MessageBox

const createMessageBox = (options: MessageBoxProps) => {
	const app = createApp(MessageBoxComponent, options as Record<string, any>)
	const ofrag = document.createDocumentFragment() as unknown as HTMLElement
	const compInstance = app.mount(ofrag)
	document.body.appendChild(ofrag)

	return [compInstance, app] as [MessageBoxInstance, App]
}

const showMessageBox = (comp: MessageBoxInstance) => {
	comp.setVisible(true)
}

const removeMessageBox = async (
	comp: MessageBoxInstance,
	app: App,
	resolve: Resolve,
	reject: Reject,
	action: string
) => {
	await hiddenMessageBox(comp)
	deleteMessageBox(app)
	resolvePromise(resolve, reject, action)
}

export const hiddenMessageBox = async (comp: MessageBoxInstance) => {
	comp.setVisible(false)
}

const deleteMessageBox = (app: App) => {
	app.unmount()
}

const resolvePromise = (resolve: Resolve, reject: Reject, action: string) => {
	if (action === "confirm") resolve("confirm")
	else reject("cancel")
}

