<template>
  <AuthFormCard class="register-form">
    <div v-if="referrer" class="register-form__referrer">
      <UserMiniCard :user="referrer" />
    </div>
    <div class="text-center">
      <h5 class="auth-form--title mb-5">{{ $t('registerForm.title') }}!</h5>
    </div>
    <form
      class="theme-form"
      :key="formKey"
      @submit.prevent="onSubmit"
      @keypress.enter="onSubmit"
    >
      <div class="form-group mb-3 task-purpose d-flex justify-content-between mb-4">
        <div
          class="task-button d-flex justify-content-center align-items-center"
          :class="{active: form.taskPurpose === 'left'}"
          @click="toggleTaskPurpose('left')"
        >
          I want to do tasks and earn crypto
        </div>
        <div
          class="task-button d-flex justify-content-center align-items-center"
          :class="{active: form.taskPurpose === 'right'}"
          @click="toggleTaskPurpose('right')"
        >
          I need tasks done for me
        </div>
      </div>
      <div class="form-group mb-3">
        <G-Input
          v-model="form.name"
          ref="name"
          :placeholder="$t('registerForm.placeholderName')"
          required
        />
      </div>
      <div class="form-group mb-3">
        <G-Input
          v-model="form.email"
          ref="email"
          type="email"
          :rules="[rules.required, rules.email]"
          :placeholder="$t('registerForm.placeholderEmail')"
          required
        />
      </div>
      <div class="form-group mb-3">
        <G-Input
          v-model.trim="form.password"
          type="password"
          ref="password"
          :rules="[
            rules.required,
            rules.minLength,
            rules.containsNumber,
            rules.containsSymbol,
            rules.containsUpperCase,
            rules.containsLowerCase
          ]"
          :placeholder="$t('registerForm.placeholderPassword')"
          required
        />
      </div>
      <div class="form-group mb-3">
        <G-Input
          v-model="form.passwordRepeat"
          type="password"
          ref="passwordRepeat"
          :rules="[rules.required, rules.mismatch]"
          :placeholder="$t('registerForm.placeholderPasswordRepeat')"
          required
        />
      </div>
      <div class="form-group mb-3">
        <G-Input
          v-model="form.companyName"
          ref="companyName"
          :placeholder="$t('registerForm.placeholderCompanyName')"
          required
        />
      </div>

      <div class="form-row">
        <div class="col-sm-6">
          <div class="form-group mb-3">
            <G-Select
              v-model="form.companyProfile"
              :items="genderList"
              ref="companyProfile"
              :rules="[rules.required]"
              :placeholder="$t('registerForm.placeholderCompanyProfile')"
              required
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group mb-3">
            <G-Select
              v-model="form.companyStaffQuantity"
              :items="countriesList"
              itemValue="id"
              ref="companyStaffQuantity"
              :rules="[rules.required]"
              :placeholder="$t('registerForm.placeholderCompanyStaffQuantity')"
              required
            />
          </div>
        </div>
      </div>

      <G-Checkbox
        v-model="form.agreement"
        ref="agreement"
        :rules="[rules.required]"
        class="w-fit m-auto"
      >
        {{ $t('registerForm.labelAgreement[0]') }}
        <router-link to="/">
          {{ $t('registerForm.labelAgreement[1]') }}
        </router-link>
      </G-Checkbox>

      <div class="form-group mb-0 mt-3 d-flex align-items-center justify-content-center">
        <G-Recaptcha v-model="form['g-recaptcha-response']" ref="recaptcha" />
      </div>
      <div class="form-group mt-3 mb-4">
        <G-Button type="submit" :loading="loading">
          {{ $t('registerForm.title') }}
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

      <div class="flex">
        {{ $t('registerForm.loginLink[0]') }}
        <router-link class="btn-link text-capitalize" to="/auth/login">
          <div class="signup main">
            {{ $t('registerForm.loginLink[1]') }}
          </div>
        </router-link>
      </div>

    </form>
  </AuthFormCard>
</template>

<script>
import AuthFormCard from '@/components/forms/AuthFormCard.vue'
import UserMiniCard from '@/views/auth/register/components/UserMiniCard.vue'

import {
  required,
  email,
  minLength,
  mismatch,
  dateInRange,
  containsNumber,
  containsSymbol,
  containsUpperCase,
  containsLowerCase,
  isThisRefsValid,
  apiFieldsErrorHandler
} from '@/utils/fields-rules.js'
import GRecaptcha from '@/components/GRecaptcha.vue'

export default {
  name: 'RegisterForm',
  components: {
    AuthFormCard,
    GRecaptcha,
    UserMiniCard
  },
  data() {
    return {
      referrer: null,
      formKey: 0,
      loading: false,
      form: {
        taskPurpose: 'left',
        email: '',
        password: '',
        passwordRepeat: '',
        companyName: '',
        birthDate: '',
        'g-recaptcha-response': '',
        type: 'email',
        country: '',
        gender: '',
        agreement: false,
        deviceHash: 'deviceHash_fingerprint'
      },
      rules: {
        required,
        email,
        containsNumber,
        containsSymbol,
        containsUpperCase,
        containsLowerCase,
        minLength: (v) => minLength(v, 8),
        mismatch: (v) => mismatch(v, this.form.password, 'password'),
        dateInRange: (v) => {
          const minAge = 18
          const maxAge = 90
          const currentDate = new Date()
          const minDate = new Date(currentDate.getFullYear() - maxAge, 0, 1)
          const maxDate = new Date(
            currentDate.getFullYear() - minAge,
            currentDate.getMonth(),
            currentDate.getDate()
          )
          const selectDate = new Date(v)
          return dateInRange(
            minDate,
            maxDate,
            selectDate,
            this.$t('registerForm.rules.minAge', { minAge }),
            this.$t('registerForm.rules.maxAge', { maxAge })
          )
        }
      },
      countriesList: []
    }
  },
  computed: {
    genderList() {
      return [
        { name: this.$t('registerForm.genderList.female'), value: 'female' },
        { name: this.$t('registerForm.genderList.male'), value: 'male' },
        { name: this.$t('registerForm.genderList.hidden'), value: 'hidden' }
      ]
    }
  },
  methods: {
    toggleTaskPurpose(option) {
      this.form.taskPurpose = option
    },
    async onSubmit() {
      const valid = isThisRefsValid(this.$refs)
      if (valid) {
        this.loading = true
        try {
          const { data } = await this.$api.auth.register(this.form)
          this.$notice({ detail: this.$t('registerForm.submitSuccessMessage') })
          this.resetForm()
          localStorage.removeItem('referrer_hash')

          localStorage.setItem('grand_auth_token', `${data.type} ${data.token}`)
          this.$router.push({ name: 'MyTasks' })

          // if (this.$route.params.code) {
          //   this.$router.push({ name: 'Registration' })
          // }
        } catch (err) {
          apiFieldsErrorHandler({ errors: err.data.errors, refs: this.$refs })
        } finally {
          this.loading = false
          this.$refs.recaptcha.reset()
        }
      }
    },
    resetForm() {
      Object.keys(this.form).forEach((key) => {
        if (key === 'type') return
        this.form[key] = ''
      })
      this.formKey += 1
    },
    async getReferrerByCode(code) {
      const { linkId, owner } = await this.$api.referral.getReferrerByCode(code)
      if (linkId) {
        this.form.referrerLinkId = linkId
      }
      this.referrer = owner
    },
    checkReferrerCode() {
      // 5qX4
      const { code } = this.$route.params
      const referrerHash = localStorage.getItem('referrer_hash')
      if (code) {
        localStorage.setItem('referrer_hash', code)
        this.getReferrerByCode(code)
      } else if (referrerHash) {
        this.getReferrerByCode(referrerHash)
      }
    }
  },
  async created() {
    this.countriesList = await this.$api.location.getCountries()

    this.checkReferrerCode()
  }
}
</script>

<style lang="scss">
.register-form {
  &__referrer {
    width: fit-content;
    margin: 0 auto 15px;
  }

  .task-purpose {
    padding: 7px;
    border: 1px solid #B5BBC6;
    border-radius: 8px;

    .task-button {
      color: #45516C;
      background: none;
      border: 0;
      border-radius: 8px;
      height: 55px;
      padding: 13px 18px;
      text-align: center;
      white-space: nowrap;
      cursor: pointer;

      &.active {
        color: #fff;
        background: #3279FD;
        border: 0;
      }
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
  }
}
</style>
