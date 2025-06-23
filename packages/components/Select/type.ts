export interface SelectProps {
  name: string;
  id: string;
  multiple?: boolean;
  options?: Option[];
}

export type SelectModel = any;

// todo
export interface SelectEmits {
  change: [value: any];
  focus: [];
  blur: [];
}

export interface Option {
  label: string | number;
  value: string | number;
}

export interface OptionProps {
  label: number | string;
  value: number | string;
  disabled?: boolean;
  hasIcon?: boolean;
}

export interface SelectContext {
  selectedLabels: (number | string)[];
  changeSelectedOptions: (option: Option) => void;
}