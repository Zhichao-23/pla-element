<script setup lang='ts'>
import { useNamespace } from '@pla-element/utils';
import type { OptionProps } from './type';
import type { SelectContext } from './type';
import { SELECT_CXT_KEY } from './contants';
import { computed, inject } from 'vue';
import { PlaIcon } from '../Icon';
import { pick } from 'lodash-es';

defineOptions({
  name: 'PlaOption'
});
const ns = useNamespace('option');

const props = defineProps<OptionProps>();
const context = inject<SelectContext>(SELECT_CXT_KEY);
const handleClicked = () => {
  if (props.disabled) return;
  context?.changeSelectedOptions(pick(props, ['label', 'value']));
}
const isActive = computed(() => {
  return context?.selectedLabels.includes(props.label);
});

</script>

<template>
  <div 
    :class="[ns.b(), {
      [ns.is('active')]: isActive
    }]" 
    @click="handleClicked"
  >
    <span :class="ns.e('icon')" v-if="hasIcon">
      <pla-icon 
        icon="check" 
        :style="{
          visibility: isActive ? 'visible' : 'hidden'
        }"
      />
    </span>
    <div :class="ns.e('label')">{{ label }}</div>
  </div>
</template>

<style scoped>
.pla-option {
  box-sizing: border-box;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: var(--pla-bg-color-hover);
  }

  &.is-disabled {
    background-color: var(--pla-disabled-bg-color);
    cursor: not-allowed;
  }

  &.is-active {
    color: var(--pla-color-primary);
    font-weight: bolder;
    background-color: var(--pla-bg-color-hover);
  }
  
  .pla-option__icon {
    margin-right: 10px;
    width: 10px;
    height: 10px;
    padding: 2px;
    border: 1px solid var(--pla-bg-color-active);
    color: var(--pla-color-primary);
  }
}
</style>