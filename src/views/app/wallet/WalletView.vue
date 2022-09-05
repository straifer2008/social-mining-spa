<template>
  <AppViewWrapper class="dashboard-view">
    <InfoActionCards class="dashboard-view__info-action-cards" />

    <div class="dashboard-view__transactions">
      <QuickTransaction />
      <Operation />
    </div>

    <G-Card :title="$t('withdrawRequests')">
      <WithdrawsTable />
    </G-Card>

    <G-Card :title="$t('allTransactions')">
      <TransactionsTable />
    </G-Card>
  </AppViewWrapper>
</template>

<script>
import AppViewWrapper from '@/components/app/AppViewWrapper.vue'
import InfoActionCards from '@/views/app/wallet/components/InfoActionCards.vue'
import QuickTransaction from '@/views/app/wallet/components/QuickTransaction.vue'
import Operation from '@/views/app/wallet/components/Operation.vue'
import WithdrawsTable from '@/components/tables/WithdrawsTable.vue'
import TransactionsTable from '@/components/tables/TransactionsTable.vue'

export default {
  name: 'WalletView',
  components: {
    AppViewWrapper,
    InfoActionCards,
    QuickTransaction,
    Operation,
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

  &__transactions {
    display: flex;
    gap: 30px;
    width: 100%;
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
