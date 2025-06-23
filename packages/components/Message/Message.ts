import type { MessageInstance, MessageOptions, MessageProps } from "./types";
import { createApp, ref, watch, type App } from "vue";
import MessageComp from "./Message.vue";
import { omit } from "lodash-es";

const _messageStore = ref<MessageInstance[]>([]);

watch(_messageStore, (newVal, oldVal) => {
	if (newVal.length < oldVal.length) {
		_messageStore.value.forEach((instance, index) => {
			instance.setTop(index);
		});
	}
});

let _id = 0;

export const Message = async (options: MessageOptions) => {
	const [app, instance] = _createMessage(
		MessageComp as unknown as MessageInstance,
		{
			...omit(options, "duration"),
			id: _id++
		}
	);
	await _hideMessage(instance, options.duration || 3000);
	_destroyMessage(app, instance);
};

const _createMessage = (MessageComp: MessageInstance, props: MessageProps) => {
	const app = createApp(MessageComp, props as Record<string, any>);
	const oFrag = document.createElement("div") as unknown as Element;
	const instance = app.mount(oFrag) as unknown as MessageInstance;
	document.body.appendChild(oFrag);
	instance.setVisible(true);
	instance.setTop(_messageStore.value.length);
	instance.setZIndex(_messageStore.value.length);
	_messageStore.value = [..._messageStore.value, instance];
	return [app, instance] as [app: App, instance: MessageInstance];
};

const _hideMessage = async (
	instance: MessageInstance,
	duration: number = 3000
) => {
	return new Promise((resolve) => {
		const id = setTimeout(() => {
			instance.setVisible(false);
			clearTimeout(id);
			resolve(1);
		}, duration);
	});
};

const _destroyMessage = (app: App, instance: MessageInstance) => {
	_messageStore.value = _messageStore.value.filter((i) => i !== instance);
	app.unmount(); // 	Vue会将组件标记为等待卸载，当transition组件的过渡结束后才触发unmount
	document.body.querySelector(`[data-id="${instance.id}"]`)?.addEventListener("transitionend", () => {
		app._container.remove();
	});
};
