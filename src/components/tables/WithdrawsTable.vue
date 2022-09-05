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
    class="withdraws-table p-datatable-sm"
    @page="onPage($event)"
  >
    <G-Column field="id" :header="$t('withdrawsTable.headers.id')"></G-Column>
    <G-Column
      field="meta.rank"
      :header="$t('withdrawsTable.headers.rank')"
    ></G-Column>
    <G-Column
      field="status"
      :header="$t('withdrawsTable.headers.status')"
    ></G-Column>
    <G-Column
      field="valueLabel"
      :header="$t('withdrawsTable.headers.value')"
    ></G-Column>
    <G-Column
      field="meta.targetWallet"
      :header="$t('withdrawsTable.headers.wallet')"
    >
      <template #body="{ data }">
        <span class="text-break ml-2 ml-sm-0">
          {{ data.meta.targetWallet }}
        </span>
      </template>
    </G-Column>
    <G-Column
      field="updatedAtLabel"
      :header="$t('withdrawsTable.headers.date')"
    ></G-Column>
    <G-Column field="" :header="$t('withdrawsTable.headers.actions')">
      <template #body="{ data }">
        <G-Button
          v-if="data.status !== 'canceled'"
          color="warning"
          size="sm"
          outline
          class="w-fit"
          @click="onCancel(data)"
        >
          {{ $t('withdrawsTable.cancel') }}
        </G-Button>
      </template>
    </G-Column>
    <template #empty>
      <p class="text-center text-muted my-3">
        {{ $t('transactionsTable.emptyMessage') }}
      </p>
    </template>
  </G-Data-Table>
</template>

<script>
import GButton from '../ui-elements/GButton.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'WithdrawsTable',
  components: { GButton },
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
    ...mapGetters({ tableData: 'WITHDRAWS_LIST' })
  },
  methods: {
    async getTransactions() {
      this.loading = true
      try {
        await this.$store.dispatch('GET_WITHDRAWS_LIST', this.pagination)
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
    },
    onCancel(row) {
      this.$confirm.require({
        target: event.currentTarget,
        message: this.$t('withdrawsTable.cancelConfirmQuestion'),
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-text',
        acceptClass: 'p-button-text',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        acceptLabel: this.$t('withdrawsTable.cancelConfirmPopup.yes'),
        rejectLabel: this.$t('withdrawsTable.cancelConfirmPopup.no'),
        accept: () => this.cancelWithdrawal(row.id),
        reject: () => {}
      })
    },
    async cancelWithdrawal(id) {
      try {
        await this.$api.transactions.cancelWithdrawalGrand({
          transaction_id: id
        })
        this.$notice({ detail: this.$t('withdrawsTable.cancelRequestMessage') })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async created() {
    this.getTransactions()
  }
}
</script>

<style lang="scss">
.withdraws-table {
}
</style>
