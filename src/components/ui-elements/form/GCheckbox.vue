<template>
  <div class="g-checkbox">
    <label class="g-checkbox__label d-block m-0">
      <input
        v-model="inputValue"
        type="checkbox"
        class="g-checkbox__input checkbox_animated"
        :class="{
          'g-error': hasError
        }"
      />
      <span
        class="g-checkbox__label--content"
        :class="{
          'g-error': hasError
        }"
      >
        <slot>
          {{ label }}
        </slot>
      </span>
    </label>
  </div>
</template>

<script>
import { fieldErrorHandler } from '@/utils/fields-rules.ts'

export default {
  name: 'GCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: [Array, Function],
      default: null
    },
    errorHandlerOnBlur: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      hasError: false,
      inputValue: false
    }
  },
  watch: {
    inputValue: {
      immediate: false,
      handler(val) {
        this.$emit('update:modelValue', val)
      }
    },
    modelValue: {
      immediate: false,
      handler(val) {
        this.inputValue = val
        if (this.rules && !this.errorHandlerOnBlur) {
          this.errorHandler()
        }
      }
    }
  },
  methods: {
    errorHandler() {
      this.hasError = fieldErrorHandler(this.rules, this.modelValue)
      return this.hasError
    }
  }
}
</script>

<style lang="scss">
.g-checkbox {
  &__input {
    &.g-error {
      &::after {
        transition: 0.3s;
        border-color: var(--danger) !important;
      }
    }
  }

  &__label {
    &--content {
      user-select: none;
      transition: 0.3s;
      &.g-error {
        text-shadow: 0 0 10px var(--danger);
      }
    }
  }
}
</style>
