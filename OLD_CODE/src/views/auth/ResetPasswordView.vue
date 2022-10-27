<template>
  <div class="reset-password-view">
    <ResetPasswordForm />
  </div>
</template>

<script>
import ResetPasswordForm from '@/components/forms/ResetPasswordForm.vue'

export default {
  name: 'ResetPasswordView',
  components: {
    ResetPasswordForm
  }
}
</script>

<style lang="scss">
.reset-password-view {
}
</style>
