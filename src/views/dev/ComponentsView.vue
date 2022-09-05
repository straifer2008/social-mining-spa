<template>
  <AppViewWrapper class="components-view">
    <div class="row">
      <div class="col">
        <G-Card> G-Card body slot </G-Card>
      </div>
      <div class="col">
        <G-Card title="G-Card title || header slot"> G-Card body slot </G-Card>
      </div>
      <div class="col">
        <G-Card title="G-Card title">
          G-Card body slot
          <template #footer> G-Card footer slot </template>
        </G-Card>
      </div>
    </div>

    <G-Card title="Buttons">
      <div class="row flex-wrap" style="gap: 20px">
        <div class="col">
          <G-Button>button</G-Button>
        </div>
        <div class="col">
          <G-Button color="warning">warning</G-Button>
        </div>
        <div class="col">
          <G-Button color="primary">primary</G-Button>
        </div>
        <div class="col">
          <G-Button color="secondary">secondary</G-Button>
        </div>
        <div class="col">
          <G-Button color="danger">danger</G-Button>
        </div>
        <div class="col">
          <G-Button color="info">info</G-Button>
        </div>
        <div class="col">
          <G-Button color="light">light</G-Button>
        </div>
        <div class="col">
          <G-Button color="dark">dark</G-Button>
        </div>
        <div class="col">
          <G-Button loading>loading</G-Button>
        </div>
        <div class="col">
          <G-Button disabled>disabled</G-Button>
        </div>
      </div>

      <div class="row flex-wrap mt-4" style="gap: 20px">
        <div class="col">
          <G-Button rounded>button</G-Button>
        </div>
        <div class="col">
          <G-Button rounded color="warning">warning</G-Button>
        </div>
        <div class="col">
          <G-Button rounded color="primary">primary</G-Button>
        </div>
        <div class="col">
          <G-Button rounded color="secondary">secondary</G-Button>
        </div>
        <div class="col">
          <G-Button rounded color="danger">danger</G-Button>
        </div>
        <div class="col">
          <G-Button rounded color="info">info</G-Button>
        </div>
        <div class="col">
          <G-Button rounded color="light">light</G-Button>
        </div>
        <div class="col">
          <G-Button rounded color="dark">dark</G-Button>
        </div>
        <div class="col">
          <G-Button rounded loading>loading</G-Button>
        </div>
        <div class="col">
          <G-Button rounded disabled>disabled</G-Button>
        </div>
      </div>

      <div class="row flex-wrap mt-4" style="gap: 20px">
        <div class="col">
          <G-Button outline>button</G-Button>
        </div>
        <div class="col">
          <G-Button outline color="warning">warning</G-Button>
        </div>
        <div class="col">
          <G-Button outline color="primary">primary</G-Button>
        </div>
        <div class="col">
          <G-Button outline color="secondary">secondary</G-Button>
        </div>
        <div class="col">
          <G-Button outline color="danger">danger</G-Button>
        </div>
        <div class="col">
          <G-Button outline color="info">info</G-Button>
        </div>
        <div class="col">
          <G-Button outline color="light">light</G-Button>
        </div>
        <div class="col">
          <G-Button outline color="dark">dark</G-Button>
        </div>
        <div class="col">
          <G-Button outline loading>loading</G-Button>
        </div>
        <div class="col">
          <G-Button outline disabled>disabled</G-Button>
        </div>
      </div>

      <div class="row flex-wrap mt-4" style="gap: 20px">
        <div class="col">
          <G-Button flat>button</G-Button>
        </div>
        <div class="col">
          <G-Button flat color="warning">warning</G-Button>
        </div>
        <div class="col">
          <G-Button flat color="primary">primary</G-Button>
        </div>
        <div class="col">
          <G-Button flat color="secondary">secondary</G-Button>
        </div>
        <div class="col">
          <G-Button flat color="danger">danger</G-Button>
        </div>
        <div class="col">
          <G-Button flat color="info">info</G-Button>
        </div>
        <div class="col">
          <G-Button flat color="light">light</G-Button>
        </div>
        <div class="col">
          <G-Button flat color="dark">dark</G-Button>
        </div>
        <div class="col">
          <G-Button flat loading>loading</G-Button>
        </div>
        <div class="col">
          <G-Button flat disabled>disabled</G-Button>
        </div>
      </div>
    </G-Card>

    <G-Card title="Chekbox">
      <div class="d-flex">
        <G-Checkbox v-model="chekbox" class="w-fit m-auto">
          {{ $t('registerForm.labelAgreement[0]') }}
        </G-Checkbox>
        <G-Checkbox
          v-model="chekbox2"
          ref="chekbox"
          :rules="[(v) => !!v || 'error msg']"
          class="w-fit m-auto"
        >
          required chekbox
        </G-Checkbox>
      </div>
    </G-Card>

    <G-Card title="Select">
      <div class="row flex-wrap" style="gap: 20px">
        <div class="col">
          <G-Select
            label="Select with error"
            placeholder="Select placeholder"
            errorHandlerOn="initial"
            clearable
            :rules="[(v) => !!v || 'error message']"
            v-model="list1Value"
            :items="listDefault"
          />
        </div>
        <div class="col">
          <G-Select
            label="Select with required mark"
            placeholder="Select placeholder"
            required
            v-model="list2Value"
            :items="listDefault"
            class=""
          />
        </div>
        <div class="col">
          <G-Select
            label="Select with hint"
            placeholder="Select placeholder"
            hint="Select hint content"
            v-model="list3Value"
            :items="list3"
            class=""
          />
        </div>
        <div class="col">
          <G-Select
            label="Select with empty data"
            placeholder="Select placeholder"
            v-model="list3Value"
            :items="list3"
            class=""
          />
        </div>
        <div class="col">
          <G-Select
            label="Select with clearable"
            placeholder="Select placeholder"
            v-model="list5Value"
            clearable
            :items="listDefault"
            class=""
          />
        </div>
        <div class="col">
          <G-Select
            label="Select with autocomplete"
            placeholder="Select placeholder"
            v-model="list4Value"
            :items="listDefault"
            autocomplete
            class=""
          />
        </div>
      </div>
    </G-Card>

    <G-Card title="Input">
      <div class="row flex-wrap" style="gap: 20px">
        <div class="col">
          <G-Input
            v-model="input1"
            label="Input with error"
            :rules="[(v) => !!v || 'error message']"
            errorHandlerOn="initial"
            placeholder="Input placeholder"
          />
        </div>
        <div class="col">
          <G-Input
            v-model="input2"
            required
            label="Input with required mark"
            placeholder="Input placeholder"
          />
        </div>
        <div class="col">
          <G-Input
            v-model="input3"
            label="Input with hint content"
            placeholder="Input placeholder"
            hint="hint content"
          />
        </div>
        <div class="col">
          <G-Input
            v-model="input4"
            label="Input with clearable"
            placeholder="Input placeholder"
            clearable
          />
        </div>
      </div>
    </G-Card>

    <G-Card title="Table">
      <TransactionsTable />
    </G-Card>

    <div class="row">
      <G-Card title="G-Dialog" class="mx-3">
        <G-Button color="primary" class="w-fit" @click="callDialog">
          call dialog
        </G-Button>
      </G-Card>
      <G-Card title="ConfirmPopup" class="mx-3">
        <G-Button color="primary" class="w-fit" @click="callConfirmPopup">
          call ConfirmPopup
        </G-Button>
      </G-Card>
      <G-Card title="Tooltip" class="mx-3">
        <G-Button color="primary" v-tooltip.bottom="'Lorem Tooltip text'">
          show Tooltip
        </G-Button>
      </G-Card>
    </div>
  </AppViewWrapper>
</template>

<script>
import AppViewWrapper from '@/components/app/AppViewWrapper.vue'
import TransactionsTable from '@/components/tables/TransactionsTable.vue'

export default {
  name: 'ComponentsView',
  components: { AppViewWrapper, TransactionsTable },
  data() {
    return {
      list1Value: '',
      list2Value: '',
      list3Value: '',
      list4Value: '',
      list5Value: 3,
      listDefault: [
        { name: 'item 1', value: 1 },
        { name: 'item 2', value: 2 },
        { name: 'item 3', value: 3 },
        { name: 'item 4', value: 4 }
      ],
      list3: [],
      input1: '',
      input2: '',
      input3: '',
      input4: 'lorem',
      chekbox: true,
      chekbox2: false
    }
  },
  methods: {
    callDialog() {
      this.$store.dispatch('SET_VISIBILITY_TRANSFER_GRAND_DIALOG', true)
    },
    callConfirmPopup() {
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
        accept: () => {},
        reject: () => {}
      })
    }
  }
}
</script>

<style lang="scss">
.components-view {
  opacity: 1;
}
</style>
