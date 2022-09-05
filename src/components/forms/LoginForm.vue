<template>
  <AuthFormCard class="login-form">
    <div class="text-center">
      <h5 class="auth-form--title">{{ $t('loginForm.title') }}</h5>
    </div>
    <form class="theme-form" :key="formKey">
      <div class="form-group">
        <G-Input
          v-model="form.email"
          type="email"
          ref="email"
          :rules="[rules.required, rules.email]"
          :placeholder="$t('loginForm.placeholderEmail')"
          required
        />
      </div>
      <div class="form-group mb-0">
        <G-Input
          v-model="form.password"
          type="password"
          ref="password"
          :rules="[rules.required]"
          :placeholder="$t('loginForm.placeholderPassword')"
          required
        />
      </div>
      <router-link
        class="btn-link btn-forgot d-block ml-auto"
        to="/auth/reset-password"
      >
        {{ $t('loginForm.btnForgot') }}
      </router-link>
      <div
        class="form-group mb-0 mt-2 d-flex align-items-center justify-content-center"
      >
        <G-Recaptcha v-model="form['g-recaptcha-response']" ref="recaptcha" />
      </div>
      <div class="form-group mt-3 mb-0">
        <G-Button type="submit" @click.prevent="onSubmit" :loading="loading">
          {{ $t('loginForm.signup') }}
        </G-Button>
      </div>
      <div class="divider">
        <div class="hr"></div>
      </div>
      <div class="text-center mt-3">
        {{ $t('loginForm.registerLink.text1') }}
        <router-link class="btn-link text-capitalize" to="/auth/register">
          {{ $t('loginForm.registerLink.text2') }}
        </router-link>
      </div>
    </form>
  </AuthFormCard>
</template>

<script>
import AuthFormCard from '@/components/forms/AuthFormCard.vue'
import GRecaptcha from '@/components/GRecaptcha.vue'
import { required, email, isThisRefsValid } from '@/utils/fields-rules.js'

export default {
  name: 'LoginForm',
  components: {
    AuthFormCard,
    GRecaptcha
  },
  data() {
    return {
      formKey: 0,
      loading: false,
      form: {
        email: '',
        password: '',
        'g-recaptcha-response': '',
        type: 'email'
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
      if (valid) {
        this.loading = true
        try {
          const { data } = await this.$api.auth.login(this.form)
          const confirmUrlToken = this.getConfirmUrlToken(data.url)
          this.resetForm()
          this.$router.push({
            name: 'Auth Confirm',
            params: { token: confirmUrlToken }
          })
        } catch (err) {
          console.log(err)
          this.$refs.recaptcha.reset()
        } finally {
          this.loading = false
        }
      }
    },
    getConfirmUrlToken(url) {
      const newUrl = new URL(url)
      const urlToken = newUrl.pathname.split('/')
      return urlToken.at(-1)
    },
    resetForm() {
      this.form.email = ''
      this.form.password = ''
      this.form['g-recaptcha-response'] = ''
      this.formKey += 1
    }
  }
}
</script>

<style lang="scss">
  .login-form {
    .btn-forgot {
      width: fit-content;
    }
  }

  .form-group {
    margin-bottom: 20px;
  }

  .divider {
    display: flex;

    .hr {
      width: 100%;
      border: 1px solid #EBECF0;

    }
  }

</style>
