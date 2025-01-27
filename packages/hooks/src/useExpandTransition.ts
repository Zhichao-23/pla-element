const _setHeight = (el: HTMLElement, val: string) => {
	el.style.height = val;
};

const _setOverflow = (el: HTMLElement, val: "none" | "hidden") => {
	el.style.overflow = val;
};

const useExpandTransition = () => {
	const beforeEnter = (el: HTMLElement) => {
		_setHeight(el, "0px");
	};
	const enter = (el: HTMLElement) => {
		_setHeight(el, el.scrollHeight + "px");
		_setOverflow(el, "hidden");
	};
	const afterEnter = (el: HTMLElement) => {
		_setHeight(el, "");
		_setOverflow(el, "none");
	};
	const beforeLeave = (el: HTMLElement) => {
		_setHeight(el, "0px");
		_setOverflow(el, "hidden");
	};
	const leave = (el: HTMLElement) => {
		_setHeight(el, el.scrollHeight + "px");
		_setOverflow(el, "none");
	};
	const afterLeave = (el: HTMLElement) => {
		_setHeight(el, "");
	};
	return {
		beforeEnter,
		enter,
		afterEnter,
		beforeLeave,
		leave,
		afterLeave,
	};
};

export default useExpandTransition;
