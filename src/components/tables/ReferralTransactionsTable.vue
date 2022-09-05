<template>
  <G-Data-Table
    :value="tableData.data"
    :lazy="true"
    :loading="loading"
    :paginator="true"
    :rows="pagination.count"
    :totalRecords="tableData.total"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="rowsPerPageOptions"
    responsiveLayout="stack"
    breakpoint="960px"
    :currentPageReportTemplate="`
      ${$t('tableGlobal.tablePageReport[0]')} {first} 
      ${$t('tableGlobal.tablePageReport[1]')} {last} 
      ${$t('tableGlobal.tablePageReport[2]')} {totalRecords}`"
    class="referral-transactions-table p-datatable-sm"
    @page="onPage($event)"
  >
    <G-Column
      field="createdAtLabel"
      :header="$t('referralTransactionsTable.headers.date')"
    ></G-Column>
    <G-Column
      field="relatedUser.id"
      :header="$t('referralTransactionsTable.headers.userID')"
    ></G-Column>
    <G-Column
      field="additional.customer_grand_label"
      :header="$t('referralTransactionsTable.headers.grandPurchaseAmount')"
    >
    </G-Column>
    <G-Column
      field="additional.customer_eth_label"
      :header="$t('referralTransactionsTable.headers.referralPurchaseAmount')"
    >
    </G-Column>
    <G-Column
      field="additional.eth_value_label"
      :header="$t('referralTransactionsTable.headers.yourReferralBonus')"
    >
    </G-Column>
    <G-Column
      field="statusLabel"
      :header="$t('referralTransactionsTable.headers.status')"
    >
      <template #body="{ data }">
        <span :class="statusClass[data.status]">{{ data.statusLabel }}</span>
      </template>
    </G-Column>
    <template #empty>
      <p class="text-center text-muted my-3">
        {{ $t('referralTransactionsTable.emptyMessage') }}
      </p>
    </template>
  </G-Data-Table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ReferralTransactionsTable',
  data() {
    return {
      loading: false,
      pagination: {
        page: 0,
        count: 10
      },
      rowsPerPageOptions: [10, 20, 50],
      statusClass: {
        pending: 'text-info',
        confirmation: 'text-warning',
        confirmed: 'text-success',
        success: 'text-success',
        rejected: 'text-danger',
        canceled: 'text-danger',
        error: 'text-danger'
      }
    }
  },
  computed: {
    ...mapGetters({ tableData: 'TRANSACTIONS' })
  },
  methods: {
    async getTransactions() {
      this.loading = true
      try {
        const params = {
          ...this.pagination,
          filter: JSON.stringify({
            type: 'launchpad_referral',
            isPositive: true
          }),
          additional: JSON.stringify({ format: 'launchpad-referral' })
        }
        await this.$store.dispatch('GET_TRANSACTIONS', params)
      } catch (err) {
        err
      } finally {
        this.loading = false
      }
    },
    onPage(evt) {
      if (
        this.pagination.page !== evt.page ||
        this.pagination.count !== evt.rows
      ) {
        this.pagination.page = evt.page
        this.pagination.count = evt.rows
        this.getTransactions()
      }
    }
  },
  async created() {
    this.getTransactions()
  }
}
</script>

<style lang="scss">
.referral-transactions-table {
}
</style>
