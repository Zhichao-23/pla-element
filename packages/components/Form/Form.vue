<script setup lang='ts'>
import { useNamespace } from '@pla-element/utils';
import type { FormContext, FormEmits, FormInstance, FormItemContext, FormProps, FormValidateCallback } from './types';
import { provide, reactive, toRefs } from 'vue';
import { FORM_CTX_KEY } from './contants';
import { each, filter, includes, keys, size } from 'lodash-es';
import type { ValidateFieldsError } from 'async-validator';

defineOptions({ name: 'PlaForm' });
const ns = useNamespace('form');
const props = withDefaults(defineProps<FormProps>(), {
  showMessage: true,
  hideRequiredAsterisk: false,
  requiredAsteriskPosition: 'right'
});
const emits = defineEmits<FormEmits>();
const fields: FormItemContext[] = [];
const addField: FormContext['addField'] = (filed) => {
  if (!filed.prop) return;
  fields.push(filed);
}
const removeField: FormContext['removeField'] = (field) => {
  if (!field.prop) return;
  fields.splice(fields.indexOf(field));
}
const formCtx = reactive({
  ...toRefs(props),
  emits,
  addField,
  removeField
});
provide(FORM_CTX_KEY, formCtx);

const filterFields = (keys: string[]) => {
  return size(keys) ? filter(fields, (field) => includes(keys, field.prop)) : fields;
}

const doValidateFields = async (fields: FormItemContext[] = []) => {
  let validateErrors: ValidateFieldsError = {};
  for (const field of fields) {
    try {
      field.validate('');
    } catch (err) {
      validateErrors = {
        ...validateErrors,
        ...(err as ValidateFieldsError)
      }
    }
  }
  if (!size(keys(validateErrors))) return true;
  return Promise.reject(validateErrors);
}

const validateFields: FormInstance['validateFields'] = async (keys, callback) => {
  try {
    await doValidateFields(filterFields(keys ?? []));
    callback?.(true);
    return true;
  } catch (err) {
    if (err instanceof Error) throw err;
    const invalidFields = err as ValidateFieldsError;
    callback?.(false, invalidFields);
    return Promise.reject(invalidFields);
  }
}
const validate: FormInstance['validate'] = async (callback) => {
  return validateFields([], callback);
}

const clearValidate = (keys?: string[]) => {
  each(filterFields(keys ?? []), field => field.clearValidate());
}
const resetFields = (keys?: string[]) => {
  each(filterFields(keys ?? []), field => field.resetField());
}

defineExpose<FormInstance>({
  validate,
  validateFields,
  clearValidate,
  resetFields,
});
</script>

<template>
  <form :class="ns.b()">
    <slot></slot>
  </form>
</template>

<style scoped></style>