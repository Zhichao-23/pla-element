<script setup lang='ts'>
import { useNamespace } from '@pla-element/utils';
import type { FormItemContext, FormItemInstance, FormItemProps, FormItemRule, FormValidateFailure, ValidateStatus } from './types';
import { computed, inject, provide, reactive, toRefs, onMounted, onUnmounted, ref, type Ref, toRef } from 'vue';
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from './contants';
import { cloneDeep, filter, get, includes, isArray, isNil, isString, keys, map, size } from 'lodash-es';
import type { RuleItem } from 'async-validator';
import Schema from 'async-validator';
import { nextTick } from 'process';

defineOptions({ name: 'PlaFormItem' });
const ns = useNamespace('form-item');
const props = withDefaults(defineProps<FormItemProps>(), {
  showMessage: true,
  required: void 0
});
const slots = defineSlots();
const formCtx = inject(FORM_CTX_KEY);
const isDisabled = computed(() => {
  return formCtx?.disabled || props.disabled;
});

const getValueByProp = (target: Record<string, any> | void) => {
  if (target && props.prop) {
    return get(target, props.prop);
  }
  return null;
}
const innerValue = computed(() => {
  return getValueByProp(formCtx?.model);
});
const propString = computed(() => {
  if (!props.prop) return '';
  return isString(props.prop) ? props.prop : props.prop.join('.');
});
const itemRules = computed(() => {
  const rules: FormItemRule[] = [];
  const { required } = props;
  if (props.rules) {
    rules.push(...props.rules);
  }
  if (formCtx?.rules) {
    const _rules = getValueByProp(formCtx.rules);
    rules.push(..._rules);
  }
  const requiredRules = filter(
    map(rules, (rule, i) => [rule, i]),
    (item: [FormItemRule, number]) => includes(keys(item[0]), 'required')
  );
  if (size(requiredRules)) {
    for (const item of requiredRules) {
      const [rule, i] = item as [FormItemRule, number];
      if (rule.required == props.required) continue;
      else {
        rules[i] = {
          ...rule,
          required
        };
      }
    }
  } else {
    rules.push({ required });
  }
  return rules;
});

let initialValue: any = null;
const validateStatus: Ref<ValidateStatus> = ref('init');
const errorMessage = ref('');
let isResetting = false;

const getTriggeredRules = (trigger: string) => {
  const rules = itemRules.value;
  if (!rules) return [];
  return filter(rules, rule => {
    if (!rule.trigger) return true;
    if (isArray(rule)) return includes(rule, trigger);
    return rule.trigger == trigger;
  }).map(rule => {
    return { trigger, ...rule } as RuleItem;
  });
}
const doValidate = async (rules: RuleItem[]) => {
  const modelName = propString.value;
  const validator = new Schema({ [modelName]: rules });
  return validator.validate({ [modelName]: innerValue.value })
    .then(() => {
      validateStatus.value = 'success';
      formCtx?.emits('validate', props, true, '');
      return true;
    })
    .catch((err: FormValidateFailure) => {
      const { errors } = err;
      validateStatus.value = 'error';
      errorMessage.value = errors && size(errors) > 0 ? errors[0].message ?? "" : "";
      formCtx?.emits('validate', props, false, errorMessage.value);
      return Promise.reject(err);
    })
}
const validate: FormItemContext['validate'] = async (trigger, callback) => {
  if (isResetting || !props.prop || !isDisabled) return false;

  const rules = getTriggeredRules(trigger);
  if (!size(rules)) {
    callback?.(true);
    return true;
  }

  validateStatus.value = 'validating';
  return doValidate(rules)
    .then(() => {
      callback?.(true);
      return true;
    }).catch((err: FormValidateFailure) => {
      const { fields } = err;
      callback?.(false, fields);
      return Promise.reject(false);
    });
}
const resetField: FormItemInstance['resetField'] = () => {
  const model = formCtx?.model;
  if (!propString.value || !model?.value || isNil(get(model, propString.value))) return;
  isResetting = true;
  model[propString.value] = cloneDeep(initialValue);
  nextTick(() => clearValidate());
}
const clearValidate = () => {
  validateStatus.value = 'init';
  errorMessage.value = '';
  isResetting = false;
}

// 将表单项的上下文注入到Form组件中，以便Form组件可以获取表单项的上下文信息
onMounted(() => {
  if (!props.prop) return;
  formCtx?.addField(formItemCtx);
  initialValue = innerValue.value;
});
onUnmounted(() => {
  if (!props.prop) return;
  formCtx?.removeField(formItemCtx);
});

const formItemCtx: FormItemContext = reactive({
  ...toRefs(props),
  disabled: isDisabled.value,
  validate,
  resetField,
  clearValidate,
  addInputId: () => { },
  removeInputId: () => { }
});
provide(FORM_ITEM_CTX_KEY, formItemCtx);

defineExpose<FormItemInstance>({
  validate,
  validateMessage: errorMessage,
  validateStatus,
  resetField,
  clearValidate
});


</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('content')">
      <slot />
      <div :class="ns.e('error-message')" v-if="validateStatus == 'error'">
        <template v-if="formCtx?.showMessage && showMessage">
          <slot name="error" :error="errorMessage">{{ errorMessage }}</slot>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pla-form-item {
  margin-bottom: 22px;
}

.pla-form-item__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
}

.pla-form-item__error-message {
  color: var(--pla-color-danger);
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
}
</style>