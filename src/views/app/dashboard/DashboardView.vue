<template>
  <AppViewWrapper class="dashboard-view">
    <InfoActionCards class="dashboard-view__info-action-cards" />

    <G-Card :title="$t('userStatusList.title')" class="user-status-section">
      <UserStatusList />
    </G-Card>

    <G-Card :title="$t('withdrawRequests')"><WithdrawsTable /></G-Card>

    <G-Card :title="$t('allTransactions')">
      <TransactionsTable />
    </G-Card>
  </AppViewWrapper>
</template>

<script>
import AppViewWrapper from '@/components/app/AppViewWrapper.vue'
import InfoActionCards from '@/views/app/dashboard/components/InfoActionCards.vue'
import UserStatusList from '@/views/app/dashboard/components/UserStatusList.vue'
import WithdrawsTable from '@/components/tables/WithdrawsTable.vue'
import TransactionsTable from '@/components/tables/TransactionsTable.vue'

export default {
  name: 'DashboardView',
  components: {
    AppViewWrapper,
    InfoActionCards,
    UserStatusList,
    WithdrawsTable,
    TransactionsTable
  }
}
</script>

<style lang="scss">
.dashboard-view {
  &__info-action-cards {
    margin-bottom: 30px;
  }

  .user-status-section {
    & > .card-body {
      &.have-header {
        padding: 40px 30px;
      }
    }
  }
}
</style>
