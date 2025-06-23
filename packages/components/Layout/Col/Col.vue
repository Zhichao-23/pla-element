<script setup lang="ts">
import type {ColProps} from "./types.ts";
import {computed, inject} from "vue";
import type {RowContext} from "../Row/types.ts";
import { ROW_CXT_KEY } from "../constants.ts";
import {useNamespace} from "@pla-element/utils";

defineOptions({
  name: "PlaCol"
});

const ns = useNamespace('col');

const props = withDefaults(defineProps<ColProps>(), {
  tag: "div",
  span: 0,
  offset: 0
});

const colClass = computed(() => {
  return [props.span ? `pla-col-${props.span}` : "", props.offset? `pla-col-offset-${props.offset}` : '', ns.b()]
});

const context = inject<RowContext>(ROW_CXT_KEY);
const style = computed(() => {
  const value = (context?.gutter ?? 0) / 2 + 'px';
  return {
    padding: `0 ${value}`,
  };
})
</script>

<template>
<component :is="tag" :class="[colClass]" :style="style">
  <slot />
</component>
</template>

<style lang="scss">
@use "sass:math";
.pla-col {
  display: block;
  min-height: 1px;
  box-sizing: border-box;
}

@for $i from 1 through 24 {
  .pla-col-#{$i} {
    $value: math.div(1, 24) * $i * 100%;
    flex: 0 0 $value;
    max-width: math.div(1, 24) * $i * 100%;
  }
}
@for $i from 1 through 24 {
  .pla-col-offset-#{$i} {
    $value: math.div(1, 24) * $i * 100%;
    margin-left: $value;
  }
}
</style>