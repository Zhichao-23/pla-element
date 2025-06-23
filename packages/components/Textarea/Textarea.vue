<script setup lang='ts'>
import { useNamespace } from '@pla-element/utils';
import type { TextareaEmits, TextareaModel, TextareaProps } from './type';
import { onMounted, onUnmounted, ref, useAttrs, useTemplateRef } from 'vue';
import { useClickOutside } from '@pla-element/hooks';

defineOptions({
  name: 'PlaTextarea',
  inheritAttrs: false
})
const ns = useNamespace('textarea')
const props = withDefaults(defineProps<TextareaProps>(), {
  placeholder: '',
  rows: 2,
  disabled: false,
  readonly: false
})
const model = defineModel<TextareaModel>('value')
const emits = defineEmits<TextareaEmits>()
const attrs = useAttrs()
const isFocus = ref(false)

const textareaRef = useTemplateRef('textareaRef')
const containerRef = useTemplateRef('containerRef')
const wrapperRef = useTemplateRef('wrapperRef')
const handleClick = () => {
  textareaRef.value?.focus()
  isFocus.value = true
}
useClickOutside(containerRef, () => {
  textareaRef.value?.blur()
  isFocus.value = false
})

// autoSize
const handleAutosize = () => {
  if (!textareaRef.value) return;
  textareaRef.value.style.height = 'auto';
  textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
};

onMounted(() => {
  if (!textareaRef.value || !props.autoSize) return
  textareaRef.value?.addEventListener('input', handleAutosize);
})
onUnmounted(() => {
  if (!textareaRef.value || !props.autoSize) return
  textareaRef.value.removeEventListener('input', handleAutosize)
})

let resizeObserver: ResizeObserver | null = null
onMounted(() => {
  if (!wrapperRef.value || !textareaRef.value) return
  resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const height = entry.borderBoxSize[0].blockSize
      wrapperRef.value!.style.height = height + 'px'
    }
  })
  resizeObserver.observe(textareaRef.value)
})
onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

const handleBlur = () => {
  emits('blur', String(model.value))
}
const handleInput = (e: Event) => {
  model.value = (e.target as HTMLInputElement)?.value
  emits('update:modelValue', String(model.value))
}
const handleChange = () => {
  emits('change', String(model.value))
}
</script>

<template>
  <div :class="[ns.b()]" ref="containerRef">
    <div :class="[ns.e('wrapper'), {
      'is-focus': isFocus
    }]" @click="handleClick" ref="wrapperRef">
      <textarea :class="ns.e('inner')" :rows="rows" :style="{
        resize: !!autosize ? 'none' : 'block'
      }" :disabled="disabled" :placeholder="placeholder" ref="textareaRef" v-bind="attrs" @input="handleInput"
        @change="handleChange" @blur="handleBlur" />
    </div>
  </div>
</template>

<style>
.pla-textarea {
  --pla-textarea-height: 40px;
}

.pla-textarea {
  vertical-align: middle;
  height: var(--pla-textarea-height, 40px);
  cursor: text;
  position: relative;

  .pla-textarea__wrapper {
    display: inline-flex;
    height: var(--pla-textarea-height);
    width: 100%;
    /* box-sizing: border-box; */
    border: 1.5px solid var(--pla-border-color-dark);
    border-radius: 4px;
    padding: 2px 2px;
    transition: box-shadow .2s cubic-bezier(.645, .045, .355, 1);

    &.is-focus {
      border: 1.5px transparent solid;
      box-shadow: 0 0 0 1px var(--pla-color-primary) inset;
      transform: translateZ(0px);
    }

    .pla-textarea__inner:focus {
      outline: none;
    }

    .pla-textarea__inner {
      width: 100%;
      box-sizing: border-box;
      padding: 2px 10px;
      border: none;
      height: auto;
      min-height: 20px;

      &::placeholder {
        color: var(--pla-text-color-placeholder)
      }
    }
  }
}
</style>