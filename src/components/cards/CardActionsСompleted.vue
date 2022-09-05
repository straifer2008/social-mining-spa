<template>
  <div class="card-actions-completed">
    <i class="card-actions-completed--icon pi pi-check"></i>
    <p class="card-actions-completed--description mb-0">
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CardActionsСompleted',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.card-actions-completed {
  text-align: center;

  &--icon {
    font-size: 4rem !important;
    color: var(--success);
    font-weight: bold;
  }
}
</style>
