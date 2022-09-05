<template>
  <div class="user-status-list">
    <template v-for="(item, idx) in platformStatuses" :key="item.title">
      <StatusCard :data="item" class="user-status-list--item" />
      <vue-feather
        v-if="idx !== platformStatuses.length - 1"
        class="user-status-list--item-arrow"
        type="chevron-right"
        size="36px"
      ></vue-feather>
    </template>
  </div>
</template>

<script>
import StatusCard from '@/views/app/dashboard/components/StatusCard.vue'

export default {
  name: 'UserStatusList',
  components: { StatusCard },
  data() {
    return {
      itemsIcons: {
        start: 'loader',
        business: 'briefcase',
        vip: 'star'
      }
    }
  },
  computed: {
    platformStatuses() {
      const data = this.$store.getters.PLATFORM_STATUSES.map((item) => {
        return { ...item, icon: this.itemsIcons[item.status] }
      })
      return data || []
    }
  },
  async created() {
    await this.$store.dispatch('GET_PLATFORM_STATUSES')
  }
}
</script>

<style lang="scss">
.user-status-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  .user-status-list--item {
    // max-width: 475px;
    width: 100%;
    height: 168px;
    margin-bottom: 0;
  }

  .user-status-list--item-arrow {
    min-width: 36px;
    color: #3279fd80;

    @media (max-width: 1024px) {
      transform: rotate(90deg);
    }
  }
}
</style>
