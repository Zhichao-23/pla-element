export interface MessageProps {
	type?: "success" | "danger" | "info" | "warning";
	message: string;
	id: number;
	icon?: "success" | "danger" | "info" | "warning";
}

export interface MessageInstance {
	setTop: (index: number) => void;
	setVisible: (value: boolean) => void;
	setZIndex: (index: number) => void;
	id: number;
}

export interface MessageOptions {
	message: string;
	type?: "success" | "danger" | "info" | "warning";
	duration?: number;
}
