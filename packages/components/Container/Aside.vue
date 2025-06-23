<script setup lang="ts">
import {useNamespace} from "@pla-element/utils";

defineOptions({
  name: 'PlaAside'
});
const ns = useNamespace('aside');
</script>

<template>
  <div :class="ns.b()">
    <slot/>
  </div>
</template>

<style scoped>
.pla-aside {
  --pla-aside-width: 300px;
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
  width: var(--pla-aside-width, 300px);
}
</style>