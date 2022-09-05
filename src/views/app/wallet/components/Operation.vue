<template>
  <div class="transactions">
    <h5>
      Operation
      <span class="badge">Soon</span>
    </h5>

    <div class="inputs">
      <div class="input">
        <G-Input
                label="&nbsp;"
          v-model="from"
          placeholder="0"
          currencySelect
        />
        <G-Select
          placeholder="GRAND"
          v-model="list1Value"
          :items="currencies"
          currencySelect
        />
      </div>
    </div>

    <div class="buttons">
      <G-Button
        color="success"
        class="w-fit"
        :loading="onWithdrawLoading"
        @click="onWithdraw($event)"
      >
        Withdraw
      </G-Button>

      <G-Button
        color="primary"
        class="w-fit"
        @click="showStakeGrandDialog"
      >
        Stake
      </G-Button>
    </div>


  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'InfoActionCards',
    data() {
      return {
        withdrawWallet: null,
        onWithdrawLoading: false,
        addressType: 'launchpad',
        currencies: [
          { name: 'GRAND', value: 'grand' },
        ],
      }
    },
    computed: {
      ...mapGetters({
        userBalance: 'BALANCE_NORMALIZE',
        grandWalletDialogVisability:
                'VISIBILITY_SET_GRAND_WITHDRAWAL_WALLET_DIALOG'
      }),
      referralCounters() {
        return this.$store.getters.SHARED_DATA?.referralCounters || null
      }
    },
    methods: {
      showStakeGrandDialog(event) {
        if (this.userBalance?.grand?.value) {
          this.$store.dispatch('SET_VISIBILITY_STAKE_GRAND_DIALOG', true)
        } else {
          this.showNeedGrandPopup(event)
        }
      },
      onWithdraw(event) {
        if (this.withdrawWallet) {
          if (this.userBalance?.grand?.value) {
            this.$store.dispatch('SET_VISIBILITY_WITHDRAWAL_GRAND_DIALOG', true)
          } else {
            this.showNeedGrandPopup(event)
          }
        } else {
          this.showNeedWalletPopup(event)
        }
      },
      showNeedWalletPopup(evt) {
        this.$confirm.require({
          target: evt.currentTarget || evt.target,
          message: this.$t('needWalletPopup.message'),
          icon: 'pi pi-exclamation-triangle',
          rejectClass: 'p-button-secondary p-button-text d-none',
          acceptClass: 'p-button-info p-button-text',
          acceptLabel: this.$t('needWalletPopup.acceptLabel'),
          rejectLabel: this.$t('needWalletPopup.rejectLabel'),
          accept: () => {
            this.$store.dispatch(
                    'SET_VISIBILITY_SET_GRAND_WITHDRAWAL_WALLET_DIALOG',
                    { show: true, addressType: this.addressType }
            )
          },
          reject: () => {}
        })
      },
      showNeedGrandPopup(evt) {
        this.$confirm.require({
          target: evt.currentTarget || evt.target,
          message: this.$t('needGrandPopup.message'),
          icon: 'pi pi-exclamation-triangle',
          rejectClass: 'p-button-secondary p-button-text d-none',
          acceptClass: 'p-button-info p-button-text',
          acceptLabel: this.$t('needGrandPopup.acceptLabel'),
          rejectLabel: this.$t('needGrandPopup.rejectLabel'),
          accept: () => {},
          reject: () => {}
        })
      },
      async checkAndSetWithdrawWallet() {
        this.withdrawWallet = await this.$api.user.getWalletAddressByType(
                'launchpad'
        )
      }
    },
    watch: {
      grandWalletDialogVisability(val) {
        if (!val) {
          this.checkAndSetWithdrawWallet()
        }
      }
    },
    async created() {
      this.$store.dispatch('GET_DASHBOARD_DATA')

      this.checkAndSetWithdrawWallet()
    }
  }
</script>

<style lang="scss">
  .transactions {
    width: 100%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    background-color: #fff;
    padding: 20px 20px 16px;

    h5 {
      color: #3DB9FF;
      font-weight: 600;
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;

      .badge {
        background-color: rgba(50, 121, 253, 0.25);
        border-radius: 0.9em;
        font-size: 12px;
        vertical-align: middle;
      }
    }

    .inputs {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      align-items: flex-end;

      .input {
        display: flex;
        position: relative;
        flex: 1;
      }
    }

    .more {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 30px;
      gap: 10px;
      color: rgba(0, 0, 0, 0.26);

    }

    .buttons {
      display: flex;
      gap: 20px;

      button {
        margin: 0;
        height: 50px;
        flex: 1;
        margin-top: 20px;
      }
    }
  }
</style>
