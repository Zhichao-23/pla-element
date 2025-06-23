import { onMounted, onUnmounted, type ShallowRef } from "vue";

export const useClickOutside = (
	elementRef: ShallowRef<HTMLElement | null>,
	callback: (e: MouseEvent) => void
) => {
	const handler = (e: MouseEvent) => {
		if (!(elementRef.value && e.target)) return;
		if (!elementRef.value.contains(e.target as Node)) callback(e);
	};

	onMounted(() => {
		document.addEventListener("click", handler);
	});

	onUnmounted(() => {
		document.removeEventListener("click", handler);
	});
};
