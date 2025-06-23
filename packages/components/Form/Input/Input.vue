<script setup lang='ts'>
import { RenderVnode, useNamespace } from '@pla-element/utils'
import type { InputEmits, InputInstance, InputModel, InputProps, InputSlots } from './type'
import { computed, inject, ref, useAttrs, useTemplateRef } from 'vue'
import { useClickOutside } from "@pla-element//hooks"
import { PlaIcon } from '../../Icon'
import { FORM_ITEM_CTX_KEY } from '../contants'

defineOptions({
  name: 'PlaInput',
  inheritAttrs: false
})
const ns = useNamespace('input')
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  contenteditable: true,
  prepend: '',
  append: ''
})
const model = defineModel<InputModel>()
const emits = defineEmits<InputEmits>()
const formItemCtx = inject(FORM_ITEM_CTX_KEY)
const attrs = useAttrs()
const isFocus = ref(false)
const isPasswordVisible = ref(false)

const realValue = computed(() => props.append + model.value + props.append)

const inputRef = useTemplateRef('inputRef')
const containerRef = useTemplateRef('containerRef')
const handleClick = () => {
  inputRef.value?.focus()
  isFocus.value = true
}
useClickOutside(containerRef, () => {
  inputRef.value?.blur()
  isFocus.value = false
})

const icon = computed(() => {
  if (props.type == 'password' && isPasswordVisible.value) return 'eye'
  if (props.type == 'password' && !isPasswordVisible.value) return 'eye-slash'
  return props.icon
})

const realType = computed(() => {
  if (props.type == 'password') {
    if (!isPasswordVisible.value) return 'password'
    if (isPasswordVisible.value) return 'text'
  }
  return props.type
})
const handlePasswordIconClick = () => {
  if (props.type == 'password') isPasswordVisible.value = !isPasswordVisible.value
}


const handleInput = (e: Event) => {
  if (props.contenteditable) model.value = ''
  model.value = (e.target as HTMLInputElement)?.value
  formItemCtx?.validate('input') // 触发校验
}
const handleChange = () => {
  emits('change', String(realValue.value))
  formItemCtx?.validate('change') // 触发校验
}
const handleBlur = () => {
  emits('blur', String(realValue.value))
  formItemCtx?.validate('blur') // 触发校验
}

defineExpose<InputInstance>({
  focus: () => {
    inputRef.value?.focus()
  },
  blur: () => {
    inputRef.value?.blur()
  },
  validate: formItemCtx?.validate
})

const slots = defineSlots<InputSlots>();
</script>

<template>
  <div :class="[ns.b()]" ref="containerRef">
    <div :class="[ns.e('wrapper'), {
      'is-focus': isFocus,
      'is-disabled': disabled
    }]" :style="{
      paddingLeft: (props.prepend || slots.prepend) ? '0px' : '10px',
      paddingRight: (props.append || slots.append) ? '0px' : '10px'
    }" @click="handleClick">
      <div :class="ns.e('attachment')" v-if="!!prepend">
        <slot name="prepend">{{ prepend }}</slot>
      </div>
      <input :class="ns.e('inner')" :type="realType" :disabled="disabled" :placeholder="placeholder"
        :readonly="readonly" ref="inputRef" v-bind="attrs" :style="{
          'user-select': !contenteditable ? 'none' : void 0,
          'pointer-events': !contenteditable ? 'none' : void 0,
        }" v-model="model" @input="handleInput" @change="handleChange" @blur="handleBlur" />
      <div :class="ns.e('attachment')" :style="{
        marginLeft: 'auto'
      }" v-if="!!append">
        <slot name="append">{{ append }}</slot>
      </div>
      <render-vnode>
        <slot name="icon">
          <pla-icon v-if="icon" :icon="icon" @click="handlePasswordIconClick" :style="{
            width: '20px',
            cursor: 'pointer'
          }" />
        </slot>
      </render-vnode>
    </div>
  </div>
</template>

<style>
.pla-input {
  --pla-input-height: 32px;
}

.pla-input {
  vertical-align: middle;
  height: var(--pla-input-height, 32px);
  position: relative;

  .pla-input__wrapper {
    height: 100%;
    box-sizing: border-box;
    border: 1.5px solid var(--pla-border-color-dark);
    border-radius: 4px;
    padding-top: 1px;
    padding-bottom: 1px;
    transition: box-shadow .2s cubic-bezier(.645, .045, .355, 1);
    display: flex;
    align-items: center;
    justify-content: center;

    &.is-focus {
      border: 1.5px var(--pla-color-primary) solid;
      transform: translateZ(0px);
    }

    &.is-disabled {
      background-color: var(--pla-disabled-bg-color);
      cursor: not-allowed;
    }

    .pla-input__inner {
      width: 100%;
      box-sizing: border-box;
      border: none;
      cursor: inherit;

      &::placeholder {
        color: var(--pla-text-color-placeholder)
      }

      &:focus {
        outline: none;
      }
    }

    .pla-input__attachment {
      background-color: var(--pla-border-color);
      box-sizing: border-box;
      height: 100%;
      padding: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1px;
    }
  }

  input[type="password"]::-webkit-eye-icon {
    display: none;
  }

  input[type="password"]::-ms-reveal {
    display: none;
  }
}
</style>