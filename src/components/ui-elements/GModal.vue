<template>
  <transition name="show-modal" mode="out-in">
    <div
      v-if="show"
      ref="overlay"
      class="g-modal--overlay"
      :class="{ 'has-scroll': hasOverlayScroll }"
      @click="$emit('click:overlay')"
    >
      <transition name="show-loader" mode="out-in">
        <GLoader class="g-modal--loader" v-if="loading" key="loader" />
        <div
          v-else
          key="modal"
          class="g-modal"
          :style="`--mw: ${maxWidth}`"
          @click.stop
        >
          <button
            class="g-modal--btn-close"
            @click="$emit('click:btn-close')"
          ></button>
          <div class="g-modal--title">{{ title }}</div>
          <div class="g-modal__content">
            <slot>Modal content</slot>
          </div>
          <div class="g-modal__footer" :class="{ visible: $slots.footer }">
            <slot name="footer"></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import GLoader from '@/components/ui-elements/GLoader.vue'

export default {
  name: 'GModal',
  components: { GLoader },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Title'
    },
    maxWidth: {
      type: String,
      default: '800px'
    }
  },
  emits: ['click:overlay', 'click:btn-close'],
  data() {
    return {
      hasOverlayScroll: false
    }
  },
  methods: {
    checkOverlayScroll() {
      setTimeout(() => {
        this.hasOverlayScroll =
          this.$refs?.overlay?.scrollHeight > this.$refs.overlay.clientHeight
      }, 1000)
    }
  },
  watch: {
    loading: {
      immediate: false,
      flush: 'post',
      handler(val) {
        if (!val && this.show) {
          this.checkOverlayScroll()
        }
      }
    },
    show: {
      immediate: false,
      flush: 'post',
      handler(val) {
        if (val && !this.loading) {
          this.checkOverlayScroll()
        }
      }
    }
  }
}
</script>

<style lang="scss">
.g-modal {
  position: relative;
  max-width: var(--mw);
  width: 100%;
  border-radius: 3px;
  background-color: #fff;
  padding: 24px;
  box-shadow: 0 11px 15px -7px #0003, 0 24px 38px 3px #00000024,
    0 9px 46px 8px #0000001f;
  overflow: hidden;

  &--overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0006;
    padding: 15px;
    z-index: 1000;
    overflow: auto;

    &.has-scroll {
      align-items: flex-start;
    }
  }

  &--loader {
    background-color: transparent !important;

    .loader {
      background-color: transparent !important;
    }
  }

  &--title {
    display: block;
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    text-align: center;
    color: var(--primary);
    margin: 0 auto 24px;
  }

  &--btn-close {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: transparent;
    border: none;
    outline: none;
    transition: 0.3s;
    cursor: pointer;

    &::after,
    &::before {
      content: '';
      position: absolute;
      width: 16px;
      height: 2px;
      background-color: #818181;
      transform: rotate(-45deg);
    }

    &::before {
      transform: rotate(45deg);
    }

    &:hover {
      background-color: #e9ecef;
    }
    &:focus {
      box-shadow: 0 0 0 0.2rem #b7e0b8;
    }
  }

  &__footer {
    &.visible {
      margin-top: 30px;
    }
  }
}

.show-modal {
  &-enter-active {
    transition: 0.6s ease;

    .g-modal {
      transition: 0.3s 0.3s ease;
    }

    .g-modal--loader {
      transition: 0.3s 0.3s ease;
    }
  }
  &-leave-active {
    transition: 0.5s 0.3s ease;

    .g-modal {
      transition: 5s ease;
    }

    .g-modal--loader {
      transition: 0.3s ease;
    }
  }

  &-enter-from,
  &-leave-to {
    background-color: transparent;

    .g-modal {
      transform: translateY(-300%);
    }

    .g-modal--loader {
      opacity: 0;
    }
  }
}

.show-loader {
  &-enter-active,
  &-leave-active {
    transition: 0.3s;
  }

  &-enter-from,
  &-leave-to {
    transform: scale(0.7);
  }
}
</style>
