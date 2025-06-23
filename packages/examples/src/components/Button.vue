<script setup lang="ts">
import Button from "../../../components/Button/Button.vue";
</script>

<template>
  <Button type="danger" disabled plain>
    <slot />
  </Button>
  <Button type="success" loading>
    <slot />
  </Button>
</template>

<style scoped>

</style>