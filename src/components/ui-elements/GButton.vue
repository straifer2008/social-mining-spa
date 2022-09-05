<template>
  <component
    class="g-button"
    :is="tag"
    :type="type"
    :disabled="disabled || loading"

  >
    <div v-if="loading" class="g-button__content--loading"></div>
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'GButton',
  props: {
    color: {
      type: String,
      default: 'success',
      description: 'look colorClass in Data'
    },
    size: {
      type: String,
      default: '',
      description: 'lg|sm|xs look sizeClass'
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => value.match(/(button|reset|submit)/)
    },
    tag: {
      type: String,
      default: 'button',
      validator: (value) => value.match(/(button|a|router-link)/)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      colorClass: {
        default: {
          success: 'btn-success',
          warning: 'btn-warning',
          primary: 'btn-primary',
          secondary: 'btn-secondary',
          danger: 'btn-danger',
          info: 'btn-info',
          light: 'btn-light',
          dark: 'btn-dark'
        },
        outline: {
          success: 'btn-outline-success',
          warning: 'btn-outline-warning',
          primary: 'btn-outline-primary',
          secondary: 'btn-outline-secondary',
          danger: 'btn-outline-danger',
          info: 'btn-outline-info',
          light: 'btn-outline-light',
          dark: 'btn-outline-dark'
        }
      },
      sizeClass: {
        lg: 'btn-lg',
        sm: 'btn-sm',
        xs: 'btn-xs'
      }
    }
  },
  computed: {
    btnStyle() {
      return this.outline ? 'outline' : 'default'
    }
  }
}
</script>

<style lang="scss">
.g-button {
  position: relative;
  justify-content: center;
  width: 100%;
  height: 65px;
  border-radius: 8px;
  background: #3279FD;
  border: 0;
  cursor: pointer;
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  line-height: 26px;

  &__content {
    &--loading {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 25px;
      height: 25px;
      border: 2px solid white;
      border-left-color: black;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: loading 0.8s linear infinite;
      z-index: -1;

      @keyframes loading {
        to {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
    }
  }
}
</style>
