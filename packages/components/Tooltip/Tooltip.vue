<script setup lang='ts'>
import { computed, reactive, ref, useTemplateRef, watch } from "vue";
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./types";
import { createPopper, type Instance } from "@popperjs/core";
import { useClickOutside } from "@pla-element//hooks";
import { debounce } from 'lodash-es';

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom",
  trigger: "hover",
  transition: "fade",
  manual: false,
  disabled: false,
  showDelay: 100,
  hideDelay: 100
});

const emits = defineEmits<TooltipEmits>();

const visible = ref<boolean>(false);
const containerNode = useTemplateRef("containerNode");
const popperNode = useTemplateRef("popperNode");
const triggerNode = useTemplateRef("tiggerNode");
let popperInstance: Instance | null = null;
let events: Record<string, EventListener> = reactive({});
let outerEvents: Record<string, EventListener> = reactive({});

// 支持popper的配置
const popperOptions = computed(() => ({
  placement: props.placement,
  ...props.popperOptions
}));
// 实现popper的弹出和销毁
watch(visible, (newVal) => {
  if (newVal) {
    if (popperNode.value && triggerNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, {
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
        ...popperOptions.value
      });
    } else {
      popperInstance?.destroy();
    }
  }
}, { flush: "post" });

// 实现动态绑定事件
const show = () => {
  visible.value = true;
  emits("visible-change", true);
}
const hide = () => {
  visible.value = false;
  emits("visible-change", false);
}
const showWithDebounce = debounce(show, props.showDelay);
const hideWithDebounce = debounce(hide, props.hideDelay);
const showFinal = () => {
  hideWithDebounce.cancel();
  showWithDebounce();
}
const hideFinal = () => {
  showWithDebounce.cancel();
  hideWithDebounce();
}
const handleClicked = () => {
  if (visible.value) {
    hideFinal();
  } else {
    showFinal();
  }
  emits("visible-change", visible.value);
}
const attachEvents = () => {
  console.log('aaa');
  events = reactive({});
  outerEvents = reactive({});
  if (props.manual) {
    return;
  }
  if (props.trigger == "hover") {
    events["mouseenter"] = () => {
      showFinal();
    }
    outerEvents["mouseleave"] = () => {
      hideFinal();
    }
    return;
  }

  events["click"] = handleClicked;
}
watch(() => props.trigger, (newVal, oldVal) => {
  if (newVal == oldVal || props.disabled) return;
  attachEvents();
}, { immediate: true });


// 实现点击外侧销毁
useClickOutside(containerNode, () => {
  if (!(props.trigger == "click" && visible.value)) return;
  hideFinal();
});


// 实现用户定义展示和隐藏
defineExpose<TooltipInstance>({
  show: showFinal,
  hide: hideFinal,
  get visible() {
    return visible.value
  }
});
</script>

<template>
  <div class="pla-tooltip" v-on="outerEvents" ref="containerNode">
    <div class="pla-tooltip__trigger" ref="tiggerNode" v-on="events">
      <slot />
    </div>
    <transition :name="transition">
      <div class="pla-tooltip__popper" ref="popperNode" v-if="visible">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<style src="./style.scss"></style>