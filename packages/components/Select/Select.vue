<script setup lang='ts'>
import type { Option, SelectContext, SelectEmits, SelectModel, SelectProps } from './type';
import { useNamespace } from '@pla-element/utils';
import { PlaIcon } from '../Icon';
import { PlaTooltip } from '../Tooltip';
import { provide, reactive, ref, useTemplateRef, watch } from 'vue';
import { SELECT_CXT_KEY } from './contants';

defineOptions({
  name: 'PlaSelect'
});
const ns = useNamespace('select');
const props = withDefaults(defineProps<SelectProps>(), {});
const emits = defineEmits<SelectEmits>();

const model = defineModel<SelectModel>();
watch(() => props.multiple, (multiple) => {
  if (multiple) {
    if (!selectedOptions.value) model.value = [];
    else model.value = [...selectedOptions.value];
  } else {
    if (!selectedOptions.value) model.value = '';
    else model.value = selectedOptions.value[0] || '';
  }
});
const selectedOptions = ref<Option[]>([]);
const changeSelectedOptions = (option: Option) => {
  const index = selectedOptions.value.findIndex(o => o.label == option.label);
  console.log(index);
  if (index == -1) {
    if (props.multiple) {
      selectedOptions.value.push(option);
    } else {
      selectedOptions.value[0] = option;
    }
  } else {
    if (props.multiple) {
      selectedOptions.value.splice(index, 1);
    } else {
      selectedOptions.value.length = 0;
    }
  }
}
provide(SELECT_CXT_KEY, reactive<SelectContext>({
  get selectedLabels() {
    return selectedOptions.value.map(option => option.label);
  },
  changeSelectedOptions
}));
watch(() => selectedOptions.value, () => {
  if (props.multiple) {
    model.value = selectedOptions.value.map(option => option.value);
  } else {
    model.value = selectedOptions.value[0].value;
  }
  emits('change', model.value);
});

const tooltipRef = useTemplateRef('tooltip');
const containerRef = useTemplateRef('container');
const optionsRef = useTemplateRef('options');
watch(() => tooltipRef.value?.visible, (newValue) => {
  if (!(optionsRef.value && containerRef.value)) return;
  if (newValue) {
    optionsRef.value.style.width = containerRef.value?.scrollWidth + 'px';
    emits('focus');
  } else {
    emits('blur');
  }
}, { flush: 'post' });

const handleXmarkClicked = (label: string | number) => {
  const index = selectedOptions.value.findIndex(o => o.label == label)
  selectedOptions.value.splice(index, 1);
}
</script>

<template>
  <div :class="ns.b()" ref="container">
    <pla-tooltip placement="bottom" trigger="click" ref="tooltip" :style="{display: 'block'}">
      <div :class="ns.e('selected-options')">
        <span :class="ns.e('tag')" v-for="option in selectedOptions">
          <span>{{ option.label }}</span>
          <pla-icon icon="xmark" @click="handleXmarkClicked(option.label)" />
        </span>
      </div>
      <template #content>
        <div :class="ns.e('options')" ref="options">
          <slot />
        </div>
      </template>
    </pla-tooltip>
  </div>
</template>

<style scoped>
.pla-select {
  cursor: pointer;
}

.pla-select__selected-options {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 30px;
  border: 1.5px solid var(--pla-border-color-dark);
  border-radius: 4px;
  &.is-active {
    border: 1.5px solid var(--pla-color-primary);
  }
}

.pla-select__tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  margin: 0 5px;
  background-color: var(--pla-bg-color-hover);
}

.pla-select__icon {
  width: 10px;
  height: 10px;
  transition: transform .2s;
  &.is-active {
    transform: rotate(180deg);
  }
}
</style>