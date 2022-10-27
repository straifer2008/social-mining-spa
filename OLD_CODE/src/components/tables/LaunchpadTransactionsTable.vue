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
    class="launchpad-transactions-table p-datatable-sm"
    @page="onPage($event)"
  >
    <G-Column
      field="createdAtLabel"
      :header="$t('transactionsTable.headers.date')"
    ></G-Column>
    <G-Column
      field="additional.method"
      :header="$t('launchpadTransactionsTable.headers.method')"
    >
    </G-Column>
    <G-Column field="additional.ethValueLabel">
      <template #header>
        <span class="d-flex align-items-center">
          {{ $t('launchpadTransactionsTable.headers.ethValueLabel') }}
          <i
            class="card-typeA__top--icon pi pi-info-circle ml-2 text-primary"
            style="font-size: 18px"
            v-tooltip.bottom="{
              value: $t('launchpadTransactionsTable.ethValueLabelTooltip'),
              class: 'custom-tooltip-class'
            }"
          ></i>
        </span>
      </template>
      <template #body="{ data }">
        {{
          fieldValuesByStatus[data.status] || data?.additional?.ethValueLabel
        }}
      </template>
    </G-Column>
    <G-Column
      field="valueLabel"
      :header="$t('launchpadTransactionsTable.headers.valueLabel')"
    >
      <template #body="{ data }">
        {{ fieldValuesByStatus[data.status] || data.valueLabel }}
      </template>
    </G-Column>
    <G-Column
      field="statusLabel"
      :header="$t('transactionsTable.headers.status')"
    >
      <template #body="{ data }">
        <span :class="statusClass[data.status]">{{ data.statusLabel }}</span>
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
import { mapGetters } from 'vuex'

export default {
  name: 'LaunchpadTransactionsTable',
  data() {
    return {
      loading: false,
      pagination: {
        page: 0,
        count: 10
      },
      rowsPerPageOptions: [10, 20, 50],
      fieldValuesByStatus: {
        canceled: '-',
        error: '-'
      },
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
          filter: JSON.stringify({ type: 'launchpad', isPositive: true }),
          additional: JSON.stringify({ format: 'launchpad' })
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
.launchpad-transactions-table {
}

.custom-tooltip-class {
  max-width: 380px !important;
  width: 100% !important;

  .p-tooltip-text {
    font-size: 12px;
    text-align: center;
  }
}
</style>
