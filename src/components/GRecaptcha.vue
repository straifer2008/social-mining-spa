<template>
  <vue-recaptcha
    v-show="show"
    :sitekey="recaptchaSiteKey"
    size="normal"
    theme="light"
    :hl="locale"
    @verify="recaptchaVerified"
    @expire="recaptchaExpired"
    @fail="recaptchaFailed"
    ref="vueRecaptcha"
    class="g-recaptcha"
    :class="{ 'g-error': !valid }"
  >
  </vue-recaptcha>
</template>

<script>
import vueRecaptcha from 'vue3-recaptcha2'

export default {
  name: 'GRecaptcha',
  components: {
    vueRecaptcha
  },
  props: {
    show: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: [String, Number],
      default: null
    }
  },
  emits: ['apply', 'update:modelValue'],
  data() {
    return {
      recaptchaSiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
      valid: true
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
    },
    locale() {
      return this.$i18n.locale
    }
  },
  methods: {
    recaptchaVerified(response) {
      this.inputValue = response
      this.$emit('apply', response)
    },
    recaptchaExpired() {
      this.inputValue = ''
      this.reset()
    },
    recaptchaFailed(response) {
      this.inputValue = ''
      console.log('recaptchaFailed', response)
    },
    errorHandler() {
      this.valid = !!this.modelValue
      return !this.valid
    },
    reset() {
      this.inputValue = ''
      this.$refs.vueRecaptcha.reset()
    }
  },
  watch: {
    modelValue() {
      this.errorHandler()
    }
  }
}
</script>

<style lang="scss">
.g-recaptcha {
  &.g-error {
    box-shadow: 0px 0px 8px 1px var(--danger),
      inset 0px 0px 8px 0px var(--danger);

    .recaptcha-checkbox-border {
      border-color: red;
    }
  }
}
</style>
