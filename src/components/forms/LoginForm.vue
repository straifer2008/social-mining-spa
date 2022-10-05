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
          :label="$t('loginForm.placeholderEmail')"
          required
        />
      </div>
      <div class="form-group mb-0">
        <G-Input
          v-model="form.password"
          type="password"
          ref="password"
          :rules="[rules.required]"
          :label="$t('loginForm.placeholderPassword')"
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

<script lang="ts" setup>
import AuthFormCard from '@/components/forms/AuthFormCard.vue'
import GRecaptcha from '@/components/GRecaptcha.vue'
import { required, email, isThisRefsValid } from '@/utils/fields-rules.ts'
import { useAuth } from '@websanova/vue-auth/src/v3.js'
import { ref, reactive, getCurrentInstance } from 'vue'

const _this = getCurrentInstance()

const auth = useAuth()
const formKey = ref(0)
const loading = ref(false)
const form = reactive({
  email: '',
  password: '',
  'g-recaptcha-response': '',
  type: 'email',
  deviceHash: 'asdasda'
})

const rules = ref({
  required,
  email
})

const onSubmit = async () => {
  const valid = isThisRefsValid(_this?.refs)
  if (valid) {
    loading.value = true
    try {
      console.log(auth)
      const { data } = await auth.login({
        data: form,
        remember: true,
        fetchUser: true,
        // staySignedIn: state.form.staySignedIn,
        redirect: '/'
      })
      console.log(data)
      // const email = form.email
      // const confirmUrlToken = this.getConfirmUrlToken(data.url)
      // this.resetForm()
      // this.$router.push({
      //   name: 'Auth Confirm',
      //   params: { token: confirmUrlToken, email }
      // })
    } catch (err: any) {
      const {response} = err
      console.log(response)
      // this.$refs.recaptcha.reset()
    } finally {
      loading.value = false
    }
  }
}
const getConfirmUrlToken = (url: string) => {
  const newUrl = new URL(url)
  const urlToken = newUrl.pathname.split('/')
  return urlToken.at(-1)
}
const resetForm = () => {
  form.email = ''
  form.password = ''
  form['g-recaptcha-response'] = ''
  formKey.value += 1
}

// export default {
//   name: 'LoginForm',
//   components: {
//     AuthFormCard,
//     GRecaptcha
//   },
//   methods: {

//   }
// }
</script>

<style lang="scss">
.login-form {
  margin-top: 60px;

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
    border: 1px solid #ebecf0;
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
  border: 1px solid #b5bbc6;
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
