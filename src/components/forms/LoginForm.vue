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
      <div class="form-group">
        <G-Recaptcha v-model="form['g-recaptcha-response']" ref="recaptcha" />
      </div>

      <div class="form-group mt-3">
        <G-Button type="submit" @click.prevent="onSubmit" :loading="loading">
          {{ $t('loginForm.signin') }}
        </G-Button>
      </div>

      <div class="divider">
        <div class="hr"></div>
        <span>Or use services</span>
        <div class="hr"></div>
      </div>

      <div class="signup">
        <img src="/img/icons/google-icon.svg" />
        Sign up with Google
      </div>

      <div class="flex">
        <div class="signup">
          <img src="/img/icons/facebook-icon.svg" />
          Sign up with Facebook
        </div>
        <div class="signup">
          <img src="/img/icons/facebook-icon.svg" />
          Sign up with Wallet
        </div>
      </div>

      <div class="flex signup-button">
        {{ $t('loginForm.registerLink.text1') }}
        <router-link class="btn-link text-capitalize" to="/auth/register">
          <div class="signup main">
            {{ $t('loginForm.registerLink.text2') }}
          </div>
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
          const email = this.form.email
          const confirmUrlToken = this.getConfirmUrlToken(data.url)
          this.resetForm()
          this.$router.push({
            name: 'Auth Confirm',
            params: { token: confirmUrlToken, email }
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

  .divider {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .hr {
      width: 100%;
      border: 1px solid #EBECF0;
    }

    span {
      font-size: 14px;
      margin: 0 31px;
      text-align: center;
      white-space: nowrap;
    }
  }

  .signup {
    height: 65px;
    border: 1px solid #B5BBC6;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    cursor: pointer;
    width: 100%;

    &.main {
      border-color: black;
      width: 140px;
    }
  }

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin: 20px 0;

    a {
      text-decoration: none;
    }

    &.signup-button {
      margin-top: 40px;
      margin-bottom: 0;
    }
  }

  @media screen and (max-width: 768px) {
    .flex {
      flex-direction: column;
    }
  }

</style>
