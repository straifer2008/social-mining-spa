<template>
  <div class="info-action-cards">
    <G-Card class="card-typeA info-action-cards__item m-0">
      <div class="card-typeA__body">
        <div class="card-typeA__top">
          <i
            class="card-typeA__top--icon pi pi-wallet"
            style="font-size: 26px"
          ></i>
          <h6 class="card-typeA__top--text">
            {{ $t('infoActionCards.yourBalance') }}
          </h6>
        </div>
        <div v-if="userBalance" class="card-typeA__bottom">
          <h6 class="mb-0">
            {{ userBalance.grand.value }} {{ userBalance.grand.name }} /
            <span class="text-muted">
              {{ userBalance.usdc_grand.value }}
              {{ userBalance.usdc_grand.name }}
            </span>
          </h6>
        </div>
      </div>
    </G-Card>

    <G-Card
      v-if="userBalance?.usd"
      class="card-typeA info-action-cards__item m-0"
    >
      <div class="card-typeA__body">
        <div class="card-typeA__top">
          <i
            class="card-typeA__top--icon pi pi-dollar"
            style="font-size: 26px"
          ></i>
          <h6 class="card-typeA__top--text">
            {{ $t('infoActionCards.yourBalance') }}
          </h6>
        </div>
        <div class="card-typeA__bottom">
          <h6 class="mb-0">
            {{ userBalance.usd.vulue }} {{ userBalance.usd.name }}
          </h6>
        </div>
      </div>
    </G-Card>

    <G-Card class="card-typeA info-action-cards__item m-0">
      <div class="card-typeA__body">
        <div class="card-typeA__top">
          <i
            class="card-typeA__top--icon pi pi-send"
            style="font-size: 26px"
          ></i>
          <h6 class="card-typeA__top--text">
            {{ $t('infoActionCards.transferP2P') }}
          </h6>
        </div>
        <div class="card-typeA__bottom">
          <G-Button
            color="primary"
            class="w-fit"
            @click="showTransferGrandDialog"
          >
            {{ $t('infoActionCards.transferFund') }}
          </G-Button>
        </div>
      </div>
    </G-Card>

    <G-Card class="card-typeA info-action-cards__item m-0">
      <div class="card-typeA__body">
        <div class="card-typeA__top">
          <vue-feather
            class="card-typeA__top--icon"
            type="shuffle"
          ></vue-feather>
          <h6 class="card-typeA__top--text">
            {{ $t('infoActionCards.grandTokensWithdrawal') }}
          </h6>
        </div>
        <div class="card-typeA__bottom">
          <G-Button
            outline
            color="primary"
            class="w-fit"
            :loading="onWithdrawLoading"
            @click="onWithdraw($event)"
          >
            {{ $t('infoActionCards.withdrawFunds') }}
          </G-Button>
        </div>
      </div>
    </G-Card>
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
      addressType: 'launchpad'
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
    showTransferGrandDialog(event) {
      if (this.userBalance?.grand?.value) {
        this.$store.dispatch('SET_VISIBILITY_TRANSFER_GRAND_DIALOG', true)
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
.info-action-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;

  .card-typeA {
    background-image: url(/src/assets/images/server/hexgon.jpg) !important;
    background-position: right;
    background-size: cover;
    background-color: rgba(255, 255, 255, 0.59);
    background-blend-mode: overlay;

    &__body {
      min-height: 130px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    &__top {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;

      &--text {
        font-weight: 600;
        line-height: 1;
        word-break: break-word;
        margin: 0;
      }

      &--icon {
        min-width: max-content;
      }
    }
  }
}
</style>
