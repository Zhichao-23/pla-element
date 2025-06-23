export interface RowProps {
    tag?: string;
    gutter?: number;
    justify?: "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
    gap?: number;
}

export interface RowContext {
    gutter: number;
}
