<template>
  <AuthFormCard class="auth-confirm-form">
    <div class="text-center">
      <h5 class="auth-form--title">{{ $t('authConfirmForm.title') }}</h5>
      <p class="auth-confirm-form--description">
        {{ $t('authConfirmForm.description') }}
      </p>

      <p v-if="repeatTimeout > 0">
        {{ $t('authConfirmForm.repeatTimeoutInfo', { second: repeatTimeout }) }}
      </p>
      <G-Button
        v-else
        size="sm"
        color="secondary"
        outline
        rounded
        :loading="repeatLading"
        class="w-50 mx-auto"
        @click="repeatAuthEmailCode"
      >
        {{ $t('authConfirmForm.repeatBtn') }}
      </G-Button>
    </div>
    <form class="theme-form" :key="formKey">
      <div class="form-group">
        <G-Input
          v-model="form.code"
          ref="code"
          :rules="[rules.required]"
          :placeholder="$t('authConfirmForm.placeholderCode')"
        />
      </div>
      <div class="form-group mt-3 mb-0">
        <G-Button type="submit" @click.prevent="onSubmit" :loading="loading">
          {{ $t('authConfirmForm.submit') }}
        </G-Button>
      </div>
      <div class="text-center mt-3" v-tooltip.bottom="'Lorem text'">
        {{ $t('authConfirmForm.notReceive') }}
      </div>

      <router-link
        to="/auth/login"
        class="btn-link btn-forgot d-block ml-auto w-fit mt-3"
      >
        {{ $t('authConfirmForm.btnBack') }}
      </router-link>
    </form>
  </AuthFormCard>
</template>

<script>
import AuthFormCard from '@/components/forms/AuthFormCard.vue'
import { required, isThisRefsValid } from '@/utils/fields-rules.js'

export default {
  name: 'AuthConfirmForm',
  components: {
    AuthFormCard
  },
  data() {
    return {
      token: '',
      repeatIntervalFunc: null,
      repeatTimeout: 0,
      formKey: 0,
      loading: false,
      repeatLading: false,
      form: {
        code: '',
        deviceHash: 'deviceHashdeviceHash deviceHashdeviceHash deviceHash'
      },
      rules: {
        required
      }
    }
  },
  methods: {
    async onSubmit() {
      const valid = isThisRefsValid(this.$refs)
      if (valid) {
        this.loading = true
        try {
          const { data } = await this.$api.auth.checkCodeAndAuthenticate(
            this.token,
            this.form
          )
          this.$notice({
            detail: this.$t('authConfirmForm.submitSuccessMessage')
          })
          this.resetForm()
          localStorage.setItem('grand_auth_token', `${data.type} ${data.token}`)
          this.$router.push({ name: 'Dashboard' })
        } catch (err) {
          console.log(err)
        } finally {
          this.loading = false
        }
      }
    },
    resetForm() {
      this.form.code = ''
      this.formKey += 1
    },
    async getAuthEmailCode() {
      const { data } = await this.$api.auth.getAuthEmailCode(this.token)
      if (!data) {
        this.$router.push('/auth/login')
        return
      }
      this.repeatIntervalStart(+data.repeat_timeout)
    },
    async repeatAuthEmailCode() {
      this.repeatLading = true
      const data = await this.$api.auth.repeatAuthEmailCode(this.token)
      this.repeatIntervalStart(+data.timeout)
      this.repeatLading = false
    },
    repeatTick() {
      this.repeatTimeout -= 1
      if (+this.repeatTimeout <= 0) {
        clearInterval(this.repeatIntervalFunc)
      }
    },
    repeatIntervalStart(timeout) {
      if (Number.isInteger(timeout)) {
        this.repeatTimeout = timeout
      }
      this.repeatIntervalFunc = setInterval(this.repeatTick, 1000)
    }
  },
  created() {
    this.token = this.$route.params.token

    this.getAuthEmailCode()
  },
  unmounted() {
    clearInterval(this.repeatIntervalFunc)
  }
}
</script>

<style lang="scss">
.auth-confirm-form {
  &--description {
    color: grey;
  }
}
</style>
