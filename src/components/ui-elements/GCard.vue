<template>
  <div class="g-card card">
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h5 class="card-title">{{ title }}</h5>
      </slot>
    </div>
    <div
      class="card-body"
      :class="{
        'have-footer': $slots.footer,
        'have-header': $slots.header || title
      }"
    >
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GCard',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.g-card {
  box-shadow: 0 2px 6px rgb(0 0 0 / 15%) !important;

  .card-header,
  .card-body,
  .card-footer {
    padding: 20px !important;
  }

  .card-header {
    padding-bottom: 14px !important;
    border-color: #c4c4c459 !important;

    .card-title {
      font-size: 22px;
      font-weight: 400;
      text-transform: unset;
    }
  }

  .card-body {
    &.have-header {
      padding-top: 14px !important;
    }

    &.have-footer {
      padding-bottom: 14px !important;
    }
  }

  .card-footer {
    padding-top: 14px !important;
    border-color: #c4c4c459 !important;
  }
}
</style>
