<template>
  <div class="app-message-list container-fluid">
    <G-Message
      v-for="(alert, idx) in alerts"
      :key="idx"
      :severity="alert.type"
      class="app-message-list__item"
      @close="removeAlert(idx)"
    >
      <span v-html="alert.content"></span>
    </G-Message>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AppMessageList',
  computed: {
    ...mapGetters({ alerts: 'USER_ALERTS' })
  },
  methods: {
    ...mapActions({ removeAlert: 'REMOVE_USER_ALERT' })
  }
}
</script>

<style lang="scss">
.app-message-list {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__item {
    margin: 0 !important;

    &:first-of-type {
      margin-top: 10px !important;
    }

    .p-message-wrapper {
      padding: 6px 15px !important;
    }

    .p-message-text {
      font-weight: normal !important;
    }
  }
}
</style>
