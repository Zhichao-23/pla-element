const reset = (el: HTMLElement) => {
	el.style.height = "";
	el.style.overflow = "";
};

const setOverflowHidden = (el: HTMLElement) => {
	el.style.overflow = "hidden";
};

const setHeightScrollHeight = (el: HTMLElement) => {
	el.style.height = el.scrollHeight + "px";
};

const setHeightTransition = (el: HTMLElement) => {
	el.style.transition = "height var(--pla-transition-duration) ease-in-out";
};

const setHeightZero = (el: HTMLElement) => {
	el.style.height = "0px";
};

const expandTransitionEvents = {
	beforeEnter: (el: HTMLElement): void => {
		setHeightZero(el);
		setOverflowHidden(el);
		setHeightTransition(el);
	},
	enter: (el: HTMLElement): void => {
		setHeightScrollHeight(el);
	},
	afterEnter: (el: HTMLElement): void => {
		reset(el);
	},
	beforeLeave: (el: HTMLElement) => {
		setOverflowHidden(el);
		setHeightTransition(el);
		setHeightScrollHeight(el);
	},
	leave: (el: HTMLElement) => {
		setHeightZero(el);
	},
	afterLeave: (el: HTMLElement) => {
		reset(el);
	},
};

export default expandTransitionEvents;
