<template>
  <div
    class="g-input"
    :class="{'currencySelect': currencySelect}"
  >
    <label
      v-if="label"
      class="g-input--label col-form-label pt-0"
      :class="{ required: required }"
    >
      {{ label }}
    </label>
    <div class="g-input__wrap">
      <input
        v-model="inputValue"
        class="g-input--input form-control"
        :class="[
          inputSizeClasses[size],
          {
            'have-right-actions': showBtnPassword,
            'g-error': errorMsg || invalid
          }
        ]"
        :type="localInputType"
        :placeholder="placeholder"
        :readonly="readonly"
        :autocomplete="autocomplete"
        @blur="onBlur"
      />
      <div class="g-input__wrap--actions">
        <slot name="append">
          <button
            v-if="showBtnPassword"
            @click.prevent="
              changeType(
                localInputType === hiddenInputType
                  ? visibleInputType
                  : hiddenInputType,
                $event
              )
            "
            class="btn-eye"
          >
            <svg width="18" height="16" fill="#9196A7">
              <use
                :href="`/img/icons/icons-symbol.svg#${
                  localInputType === hiddenInputType
                    ? 'eye-icon'
                    : 'eye-hidden-icon'
                }`"
              />
            </svg>
          </button>
        </slot>
      </div>
    </div>
    <div class="g-input__message">
      <transition name="show-message" mode="out-in">
        <div v-if="errorMsg" class="g-input__message--error">
          {{ errorMsg }}
        </div>
        <div
          v-else-if="(hint || $slots.hint) && !errorMsg"
          class="g-input__message--hint"
        >
          <slot name="hint">
            {{ hint }}
          </slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { fieldErrorHandler } from '@/utils/fields-rules.js'

export default {
  name: 'GInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },
    label: {
      type: [String, Number],
      default: null
    },
    placeholder: {
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => {
        return value.match(/(text|number|email|password|tel|date)/)
      }
    },
    rules: {
      type: [Function, Array],
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    currencySelect: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: ''
    },
    invalid: {
      type: Boolean,
      default: false
    },
    errorHandlerOn: {
      type: String,
      default: 'change',
      description: 'blur | change | initial'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    size: {
      type: String,
      default: '',
      description: 'lg'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      errorMsg: '',
      localInputType: '',
      hiddenInputType: 'password',
      visibleInputType: 'text',
      inputSizeClasses: {
        lg: 'input-lg'
      }
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    },
    showBtnPassword() {
      return this.type === this.hiddenInputType
    }
  },
  mounted() {
    this.changeType(this.type)

    if (this.errorHandlerOn === 'initial') {
      this.errorHandler()
    }
  },
  methods: {
    changeType(newType, evt) {
      // bug fixer. if remove this row input type changed when pres "Enter" ))
      if (evt && evt.pointerId === -1) return

      this.localInputType = newType
    },
    onBlur() {
      this.checkErrorOnBluR()
    },
    checkErrorOnBluR() {
      if (this.errorHandlerOn === 'blur' && this.rules) {
        this.errorHandler()
      }
    },
    errorHandler() {
      this.errorMsg = fieldErrorHandler(this.rules, this.modelValue)
      return this.errorMsg
    }
  },
  watch: {
    modelValue() {
      if (this.errorHandlerOn !== 'blur' && this.rules) {
        this.errorHandler()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.g-input {
  &.currencySelect {
    flex: 1;
  }

  label.col-form-label.g-input--label {
    font-size: 14px;
    color: #999;
    line-height: 1;
  }
  .g-input__wrap {
    input.form-control {
      border-color: #d6e0e3;
      font-size: 14px;
      font-weight: 400;
      color: var(--dark);

      &::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: var(--dark);
        opacity: 0.5;
      }
    }
  }
}
</style>

<style lang="scss">
.g-input {
  &__wrap {
    position: relative;

    &--actions {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);

      button {
        display: block;
        border: none;
        background: unset;
        padding: 0;

        svg {
          display: block;
        }
      }
    }
  }

  &--label {
    &.required {
      position: relative;

      &::after {
        content: '*';
        position: absolute;
        top: -2px;
        right: -8px;
        color: #4466f2;
      }
    }
  }

  &--input {
    width: 100%;
    height: 65px;
    border-radius: 8px;
    color: #B5BBC6;
    border: 1px solid #B5BBC6;
    padding: 20px 15px;

    &.have-right-actions {
      padding-right: 40px;
    }
    &.g-error {
      border-color: var(--danger) !important;
    }
    &.input-lg {
      height: 41px;
      font-size: 16px !important;
    }
  }

  &__message {
		margin-top: 10px;

		&--error {
      height: 15px;
      display: block;
      font-style: normal;
      font-weight: 400;
      font-size: 17px;
      line-height: 28px;
      // text-overflow: ellipsis;
      // white-space: nowrap;
      color: #CF3B27;
			transition: all 0.3s;
    }

    &--hint {
      height: 15px;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: var(--gray);
    }
  }

  .show-message-enter-active,
  .show-message-leave-active {
    transition: all 0.3s ease;
  }

  .show-message-enter-from,
  .show-message-leave-to {
    height: 0;
    overflow: hidden;
    opacity: 0;
  }
}
</style>
