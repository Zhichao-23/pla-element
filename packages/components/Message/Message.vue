<script setup lang='ts'>
import {computed, ref} from 'vue';
import type { MessageInstance, MessageProps } from './types';
import { typeIconMap } from "@pla-element/utils";
import PlaIcon from "../Icon/Icon.vue";

defineOptions({
  name: "PlaMessage"
});
const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
});

const visible = ref(false);
const top = ref("0px");
const zIndex = ref(9999);
const style = computed(() => ({
  top: top.value,
  zIndex: zIndex.value
}));

const icon = computed(() => {
  if (props.icon) return props.icon;
  return typeIconMap.get(props.type);
});

const setTop = (index: number) => {
  top.value = index * (40 + 8) + "px";
}
const setZIndex = (index: number) => {
  zIndex.value = 9999 - index;
}
const setVisible = (value: boolean) => {
  visible.value = value;
}
defineExpose<MessageInstance>({
  setTop,
  setVisible,
  setZIndex,
  id: props.id
});
</script>

<template>
  <Transition name="fade">
    <div :class="['pla-message', `pla-message--${type}`, 'is-plain']"
         ref="message" :style="style"
         :data-id="`${id}`"
         v-if="visible" 
    >
      <PlaIcon :icon="icon" :style="{ marginRight: '10px' }" :type="type"></PlaIcon>
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<style src="./style.scss"></style>