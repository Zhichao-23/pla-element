<script setup lang='ts'>
import Dropdown from '@pla-element/components/Dropdown/Dropdown.vue';
const options = [
  {
    key: 1,
    label: 'abc'
  }
];
</script>

<template>
<Dropdown :menu-options="options">
  <button>aaaa</button>
</Dropdown>
</template>

<style scoped>
  
</style>