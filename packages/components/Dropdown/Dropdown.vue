<script setup lang='ts'>
import type { DropdownEmits, DropdownProps } from './types';
import type { MenuOption } from './types';
import Tooltip from '../Tooltip/Tooltip.vue';
import { computed, useTemplateRef } from 'vue';
import RenderVnode from '@pla-element/utils/src/RenderVnode';
import type { TooltipInstance } from '../Tooltip/types';

const props = withDefaults(defineProps<DropdownProps>(), {
  "menuOptions": () => [] as MenuOption[],
});

const tooltipProps = computed(() => {
  const { menuOptions: _, ...rest } = props;
  return rest;
});

const emits = defineEmits<DropdownEmits>();
const visibleChange = (value: boolean) => {
  emits("visible-change", value);
}
const itemClick = (item: MenuOption) => {
  if (item.disabled) return;
  emits("select", item);
}


const tooltipInstance = useTemplateRef("tooltipInstance");
defineExpose<TooltipInstance>({
  show: () => tooltipInstance.value?.show,
  hide: () => tooltipInstance.value?.hide
});

</script>

<template>
  <div class="pla-dropdown">
    <Tooltip v-bind="tooltipProps" @visible-change="visibleChange" ref="tooltipInstance">
      <slot />
      <template #content>
        <ul class="pla-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divide-placeholder"></li>
            <li
              :class="[{ 'is-disabled': item.disabled, 'is-divided': item.divided }, `pla-dropdown__item-${item.key}`]"
              @click="itemClick(item)">
              <RenderVnode :vnode="item.label ?? ''"></RenderVnode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>

</template>

<style>
.pla-dropdown {
  --pla-dropdown-bg-color: var(--pla-bg-color);
}

.pla-dropdown {
  .pla-dropdown__menu {
    padding: 0;
    margin: 0;
    list-style: none;

    &>li {
      box-sizing: border-box;
      padding: 4px 12px;
      background-color: var(--pla-dropdown-bg-color);

      &:hover {
        --pla-dropdown-bg-color: var(--pla-bg-color-hover);
      }

      &:active {
        --pla-dropdown-bg-color: var(--pla-bg-color-active);
      }
    }
  }
}
</style>