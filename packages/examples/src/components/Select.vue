<script setup lang='ts'>
import { ref } from "vue";
import { PlaSelect, PlaOption } from "../../../components/Select"
const selectedValue= ref('');
const options = [{
    label: 'option1',
    value: 'option1'
  }, {
    label: 'option2',
    value: 'option2'
  }
]
</script>

<template>
<pla-select multiple v-model="selectedValue" name="select" id="s" :style="{width: '300px'}">
  <pla-option v-for="option in options" :key="option.label" :label="option.label" :value="option.value"></pla-option>
</pla-select>
</template>

<style scoped>
  
</style>