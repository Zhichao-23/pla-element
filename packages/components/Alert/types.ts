export interface AlertProps {
	title?: string;
	type?: "primary" | "success" | "info" | "warning" | "danger";
	description?: string;
	closable?: boolean;
	effect?: "light" | "dark";
	center?: boolean;
	showIcon?: boolean;
}

export interface AlertEmits {
	close: [e: MouseEvent];
}
