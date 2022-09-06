<template>
  <AuthFormCard class="auth-confirm-form">
    <div>
      <img class="icon" src="/img/icons/grand-icon.png" />
      <h5 class="auth-form--title">{{ $t('authConfirmForm.title') }}</h5>
      <p class="auth-confirm-form--description">
        {{ $t('authConfirmForm.description1') }}<br>{{ $t('authConfirmForm.description2') }} {{ email }}.
      </p>
    </div>
    <form class="theme-form" :key="formKey">
      <div class="form-group input-code">
        <G-Input
          v-model="form.code"
          ref="code"
          :rules="[rules.required]"
          :placeholder="$t('authConfirmForm.placeholderCode')"
        />
      </div>
      <div class="form-group">
        <G-Button type="submit" @click.prevent="onSubmit" :loading="loading">
          {{ $t('authConfirmForm.submit') }}
        </G-Button>
      </div>

      <div
        class="w-50 mx-auto text-center repeat"
        @click="repeatAuthEmailCode"
      >
        {{ $t('authConfirmForm.repeatBtn') }}
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
      email: '',
      formKey: 0,
      loading: false,
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
          this.$router.push({ name: 'MyTasks' })
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
      }
    },
    async repeatAuthEmailCode() {
      this.repeatLading = true
      const data = await this.$api.auth.repeatAuthEmailCode(this.token)
      this.repeatLading = false
    },

  },
  created() {
    this.token = this.$route.params.token
    this.email = this.$route.params.email

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
    font-size: 20px;
    line-height: 35px;
  }

  .icon {
    margin-bottom: 30px;
  }

  p {
    margin-bottom: 40px;
  }

  .input-code {
    margin-bottom: 60px;
  }
}

  .repeat {
    font-size: 17px;
    line-height: 30px;
    color: #3279FD;
    cursor: pointer;
  }

  h5 {
    text-align: left;
  }
</style>
