<script setup lang='ts'>
import type {RowContext, RowProps} from "./types.ts";
import {computed, provide, reactive, toRef} from "vue";
import {ROW_CXT_KEY} from "../constants.ts";
import {useNamespace} from "@pla-element/utils";

defineOptions({
  name: "PlaRow"
});

const ns = useNamespace('row');

const props = withDefaults(defineProps<RowProps>(), {
  tag: "div",
  gutter: 0,
  justify: "start"
});

const style = computed(() => {
  const value = -props.gutter/2 + 'px';
  return {
    margin: `0 ${value}`,
    rowGap: `${props.gap}px`
  }
});

provide<RowContext>(ROW_CXT_KEY, reactive({
  gutter: toRef(props, 'gutter')
}));

</script>

<template>
<component :is="tag" :class="[`${ns.b()}`, `${ns.is(`justify-${justify}`)}`]" :style="style">
  <slot />
</component>
</template>

<style lang="scss" src="./style.scss"></style>