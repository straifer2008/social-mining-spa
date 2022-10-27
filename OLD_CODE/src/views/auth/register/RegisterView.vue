<template>
  <div class="register-view">
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '@/components/forms/RegisterForm.vue'

export default {
  name: 'RegisterView',
  components: {
    RegisterForm
  }
}
</script>

<style lang="scss">
.register-view {
}
</style>
