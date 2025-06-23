<script setup lang="ts">
import {useNamespace} from "@pla-element/utils";
import type {ContainerProps} from "./type.ts";
import { computed, type VNode } from 'vue';

defineOptions({
  name: 'PlaContainer'
});

const ns = useNamespace('container');
const props = defineProps<ContainerProps>();
const slots = defineSlots();
const isVertical = computed(() => {
  if (props.direction === 'vertical') {
    return true;
  }
  const slotsNodes = slots.default ? slots.default() : null;
  if (slotsNodes) {
    return slotsNodes.some((node: VNode) => {
      return (
        typeof node.type === 'object' &&
        node.type !== null &&
        'name' in node.type &&
        ['pla-header', 'pla-footer'].includes(node.type.name as string)
      );
    });
  }

  return false;
});
</script>

<template>
<div :class="[ns.b(), {
  'is-vertical': isVertical
}]"
>
  <slot />
</div>
</template>

<style scoped lang="scss">
.pla-container {
  display: flex;
  box-sizing: border-box;
  &.is-vertical {
    flex-direction: column;
  }
}
</style>