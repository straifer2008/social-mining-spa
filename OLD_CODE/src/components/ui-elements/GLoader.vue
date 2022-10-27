<template>
  <div v-if="show" class="g-loader loader-wrapper">
    <div class="loader bg-white">
      <div class="whirly-loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GLoader',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style></style>
