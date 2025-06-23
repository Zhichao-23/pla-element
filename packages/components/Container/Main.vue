<script setup lang="ts">
import {useNamespace} from "@pla-element/utils";

defineOptions({
  name: 'PlaMain'
});
const ns = useNamespace('main');
</script>

<template>
  <div :class="ns.b()">
    <slot/>
  </div>
</template>

<style scoped>
.pla-main {
  --pla-main-padding: 20px;
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: var(--pla-main-padding);
}
</style>