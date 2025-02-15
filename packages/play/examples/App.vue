<script setup lang='ts'>
import { PlaDropdown } from '@pla-element/components';
import { ref } from 'vue';
const options = ref([{
  key: 1,
  label: "a"
}, {
  key: 2,
  label: "b"
}])

</script>

<template>
  <pla-dropdown :menu-options="options" trigger="click">
    <button>ppp</button>
  </pla-dropdown>

</template>

<style></style>