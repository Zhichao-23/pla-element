<script setup lang="ts">
import {useNamespace} from "@pla-element/utils";

defineOptions({
  name: 'PlaHeader'
});
const ns = useNamespace('header');

</script>

<template>
<div :class="ns.b()">
  <slot/>
</div>
</template>

<style scoped>
.pla-header {
  --pla-header-padding: 0 20px;
  --pla-header-height: 60px;
  padding: var(--pla-header-padding);
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--pla-header-height);
}
</style>