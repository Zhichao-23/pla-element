<script setup lang='ts'>
import { notification } from '@pla-element/components/Notification/Notification';
const click = () => {
  console.log('notice');
  notification({
    title: 'pppp',
    message: 'qwwe',
    position: 'bottom-left'

  })
}

</script>

<template>
  <button @click="click">notification</button>
</template>

<style scoped></style>