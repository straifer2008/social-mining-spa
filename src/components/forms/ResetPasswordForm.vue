<template>
  <AuthFormCard class="reset-password-form">
    <div class="text-center">
      <h5 class="auth-form--title">{{ $t('resetPasswordForm.title') }}</h5>
    </div>
    <form ref="form" :key="formKey" class="theme-form">
      <div class="form-group">
        <G-Input
          v-model="form.email"
          type="email"
          ref="email"
          :rules="[rules.required, rules.email]"
          :label="$t('resetPasswordForm.placeholderEmail')"
          required
        />
      </div>

      <div class="form-group mt-3 mb-0">
        <G-Button type="submit" @click.prevent="onSubmit" :loading="loading">
          {{ $t('resetPasswordForm.submit') }}
        </G-Button>
      </div>

      <div class="text-right mt-3">
        <router-link class="btn-link w-fit" to="/auth/login">
          {{ $t('resetPasswordForm.lonkLogin') }}
        </router-link>
      </div>
    </form>
  </AuthFormCard>
</template>

<script>
import AuthFormCard from '@/components/forms/AuthFormCard.vue'
import { required, email, isThisRefsValid } from '@/utils/fields-rules.js'

export default {
  name: 'ResetPasswordForm',
  components: {
    AuthFormCard
  },
  data() {
    return {
      formKey: 0,
      loading: false,
      form: {
        email: ''
      },
      rules: {
        required,
        email
      }
    }
  },
  methods: {
    async onSubmit() {
      const valid = isThisRefsValid(this.$refs)
      console.log('onSubmit', valid)
      if (valid) {
        this.loading = true
        try {
          await this.$api.auth.reset(this.form)
          this.$notice({
            detail: this.$t('resetPasswordForm.submitSuccessMessage'),
            life: 0
          })

          this.resetForm()
        } catch (err) {
          console.log(err)
        } finally {
          this.loading = false
        }
      }
    },
    resetForm() {
      this.form.email = ''
      this.formKey += 1
    }
  }
}
</script>

<style lang="scss">
.reset-password-form {
  margin-top: 120px;
}
</style>
