import type {
  RuleItem,
  ValidateError,
  ValidateFieldsError
} from 'async-validator';
import type { Ref } from 'vue';

// 表单单项规则接口，扩展自 RuleItem，添加 trigger 属性
export interface FormItemRule extends RuleItem {
  trigger?: string | string[];
}

// 表单规则类型，记录类型，键为字符串，值为 FormItemRule 数组
export type FormRules = Record<string, FormItemRule[]>;

// 表单验证结果类型，Promise<boolean>
export type FormValidateResult = Promise<boolean>;

// 表单验证回调类型，接收 isValid 和可选的 invalidFields 参数
export type FormValidateCallback = (
  isValid: boolean,
  invalidFields?: ValidateFieldsError
) => void;

// 验证状态类型，包含四种状态
export type ValidateStatus = "success" | "error" | "init" | "validating";

// 表单验证失败接口，包含 errors 和 fields 属性
export interface FormValidateFailure {
  errors?: ValidateError[];
  fields: ValidateFieldsError;
}

// 表单属性接口，定义表单相关属性
export interface FormProps {
  model: Record<string, any>;
  rules?: FormRules;
  disabled?: boolean;
  labelWidth?: string;
  labelPosition?: "left" | "right" | "top";
  labelSuffix?: string;
  showMessage?: boolean;
  hideRequiredAsterisk?: boolean;
  requiredAsteriskPosition?: "left" | "right";
}

// 表单触发事件接口，定义 validate 事件的参数
export interface FormEmits {
  (
    event: "validate",
    prop: FormItemProps,
    isValid: boolean,
    message: string
  ): void;
}

// 表单单项属性接口，定义表单单项相关属性
export interface FormItemProps {
  prop?: string | string[];
  label?: string;
  for?: string;
  required?: boolean;
  rules?: FormItemRule[];
  disabled?: boolean;
  labelWidth?: number | string;
  showMessage?: boolean;
}

// 表单实例接口，定义表单实例方法
export interface FormInstance {
  validate(
    callback?: FormValidateCallback
  ): FormValidateResult;
  validateFields(keys?: string[], callback?: FormValidateCallback): FormValidateResult
  resetFields(keys?: string[]): void;
  clearValidate(keys?: string[]): void;
}

// 表单单项实例接口，定义表单单项实例属性和方法
export interface FormItemInstance {
  validateStatus: Ref<ValidateStatus>;
  validateMessage: Ref<string>;
  validate(
    trigger: string,
    callback?: FormValidateCallback
  ): FormValidateResult;
  resetField(): void;
  clearValidate(): void;
}

// 表单上下文接口，扩展自 FormProps，添加 emits、addField、removeField 方法
export interface FormContext extends FormProps {
  emits: FormEmits;
  addField(field: FormItemContext): void;
  removeField(field: FormItemContext): void;
}

// 表单单项上下文接口，扩展自 FormItemProps，定义表单单项上下文方法
export interface FormItemContext extends FormItemProps {
  resetField(): void;
  validate(
    trigger: string,
    callback?: FormValidateCallback
  ): FormValidateResult;
  clearValidate(): void;
  addInputId(id: string): void;
  removeInputId(id: string): void;
}