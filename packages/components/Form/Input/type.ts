import type { VNode } from "vue";
import type {  FormItemContext } from "../types";

export interface InputProps {
  type?: 'text' | 'password';
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  icon?: string;
  contenteditable?: boolean;
  autoSize?: boolean;
  prepend?: string;
  append?: string;
}

export type InputModel = string | number;

export interface InputEmits {
  'change': [newVal: string];
  'blur': [newVal: string];
}

export interface InputSlots {
  prepend: (() => VNode) | undefined;
  append: (() => VNode) | undefined;
  icon: (() => VNode) | undefined;
}

export interface InputInstance {
  focus: () => void;
  blur: () => void;
  validate?: FormItemContext['validate']
}