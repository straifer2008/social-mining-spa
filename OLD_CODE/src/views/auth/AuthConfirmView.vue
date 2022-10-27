<template>
  <div class="auth-confirm-view">
    <AuthConfirmForm />
  </div>
</template>

<script>
import AuthConfirmForm from '@/components/forms/AuthConfirmForm.vue'

export default {
  name: 'AuthConfirmView',
  components: {
    AuthConfirmForm
  }
}
</script>

<style lang="scss">
.auth-confirm-view {
}
</style>
