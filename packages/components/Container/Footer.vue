<script setup lang="ts">
import {useNamespace} from "@pla-element/utils";

defineOptions({
  name: 'PlaFooter'
});
const ns = useNamespace('footer');

</script>

<template>
<div :class="ns.b()">
  <slot/>
</div>
</template>

<style scoped>
.pla-footer {
  --pla-footer-padding: 0 20px;
  --pla-footer-height: 60px;
  padding: var(--pla-footer-padding);
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--pla-footer-height);
}
</style>