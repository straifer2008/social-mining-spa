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
    class="transactions-table p-datatable-sm"
    @page="onPage($event)"
  >
    <G-Column
      field="id"
      :header="$t('transactionsTable.headers.id')"
    ></G-Column>
    <G-Column
      field="status"
      :header="$t('transactionsTable.headers.status')"
    ></G-Column>
    <G-Column
      field="valueLabel"
      :header="$t('transactionsTable.headers.value')"
    ></G-Column>
    <G-Column
      field="title"
      :header="$t('transactionsTable.headers.title')"
    ></G-Column>
    <G-Column
      field="fromUser.name"
      :header="$t('transactionsTable.headers.fromUser')"
    ></G-Column>
    <G-Column
      field="toUser.name"
      :header="$t('transactionsTable.headers.toUser')"
    ></G-Column>
    <G-Column
      field="updatedAtLabel"
      :header="$t('transactionsTable.headers.date')"
    ></G-Column>
    <template #empty>
      <p class="text-center text-muted my-3">
        {{ $t('transactionsTable.emptyMessage') }}
      </p>
    </template>
  </G-Data-Table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TransactionsTable',
  data() {
    return {
      loading: false,
      pagination: {
        page: 0,
        count: 10
      },
      rowsPerPageOptions: [10, 20, 50]
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
            type: ['!launchpad', '!launchpad_referral']
          })
        }
        await this.$store.dispatch('GET_TRANSACTIONS', params)
      } catch (err) {
        err
      } finally {
        this.loading = false
      }
    },
    onPage(evt) {
      this.pagination.page = evt.page
      this.pagination.count = evt.rows
      this.getTransactions()
    }
  },
  async created() {
    this.getTransactions()
  }
}
</script>

<style lang="scss">
.transactions-table {
}
</style>
