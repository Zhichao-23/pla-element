const reset = (el: HTMLElement) => {
	el.style.height = "";
	el.style.overflow = "";
};

const expandTransitionEvents = {
	beforeEnter: (el: HTMLElement): void => {
		el.style.height = "0px";
		el.style.overflow = "hidden";
		el.style.transition = "height var(--pla-transition-duration) ease-in-out";
	},
	enter: (el: HTMLElement): void => {
		el.style.height = el.scrollHeight + "px";
	},
	afterEnter: (el: HTMLElement): void => {
		reset(el);
	},
	beforeLeave: (el: HTMLElement) => {
		el.style.height = el.scrollHeight + "px";
		el.style.overflow = "hidden";
		el.style.transition = "height var(--pla-transition-duration) ease-in-out";
	},
	leave: (el: HTMLElement) => {
		el.style.height = "0px";
	},
	afterLeave: (el: HTMLElement) => {
		reset(el);
	},
};

export default expandTransitionEvents;
