export interface TextareaProps {
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  autoSize?: boolean;
  autosize?: boolean;
}

export type TextareaModel = string | number;

export interface TextareaEmits {
  'update:modelValue': [newVal: string];
  'change': [newVal: string];
  'blur': [newVal: string];
}