<script setup lang='ts'>
import type { DropdownEmits, DropdownProps } from './types';
import type { MenuOption } from './types';
import Tooltip from '../Tooltip/Tooltip.vue';
import { computed, useTemplateRef } from 'vue';
import { RenderVnode } from '@pla-element/utils';
import type { TooltipInstance } from '../Tooltip/types';
import { useDisabledStyle } from '@pla-element/hooks';

defineOptions({
  name: "PlaDropdown"
});

const props = withDefaults(defineProps<DropdownProps>(), {
  menuOptions: () => [] as MenuOption[],
  disabled: false
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

useDisabledStyle();

const tooltipInstance = useTemplateRef("tooltipInstance");
defineExpose<TooltipInstance>({
  show: () => tooltipInstance.value?.show(),
  hide: () => tooltipInstance.value?.hide(),
  get visible () {
    return !!tooltipInstance.value?.visible;
  }
});
</script>

<template>
  <div class="pla-dropdown">
    <Tooltip v-bind="tooltipProps" @visible-change="visibleChange" ref="tooltipInstance" trigger="click" manual
      :disabled="disabled">
      <slot />
      <template #content>
        <ul class="pla-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="pla-dropdown__item-separator"></li>
            <li :id="`pla-dropdown__item-${item.key}`"
              :class="[{ 'is-disabled': item.disabled, 'is-divided': item.divided }, 'pla-dropdown__item-content']"
              @click="itemClick(item)">
              <RenderVnode :vnode="item.label ?? ''"></RenderVnode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<style src="./style.scss"></style>