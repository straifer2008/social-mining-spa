<template>
  <div class="ref-link-and-referral-address">
    <G-Card class="my-ref-link-card" :title="$t('myRefLinkCard.title')">
      <span class="my-ref-link-card--title">
        {{ $t('myRefLinkCard.subTitle') }}
      </span>

      <G-Input v-model="userreferralLink" size="lg" readonly>
        <template #append>
          <i
            class="pi pi-copy copy-address-btn"
            style="
              display: block;
              color: var(--primary);
              cursor: pointer;
              font-size: 21px;
            "
            @click="onCopyAddress"
          ></i>
        </template>
      </G-Input>
    </G-Card>
    <G-Card class="referral-address-card">
      <span class="referral-address-card--title">
        {{ $t('referralAddressCard.title') }}
      </span>

      <div class="address-info">
        <span class="address-info--title">
          {{ $t('launchpadWelcomeCard.tokenAddress') }}
        </span>
        <span
          class="address-info--status badge badge-pill"
          :class="
            statusClass[
              USER?.misc?.wallets[addressType] || withdrawAddressStatus.NONE
            ]
          "
        >
          {{
            $t(
              `launchpadWelcomeCard.statuses.${
                USER?.misc?.wallets[addressType] || withdrawAddressStatus.NONE
              }`
            )
          }}
        </span>
      </div>

      <G-Button size="lg" color="primary" @click="onClickChangeGrandWallet">
        {{
          USER?.misc?.wallets[addressType] !== 'none'
            ? $t('referralAddressCard.btnSubmit.change')
            : $t('referralAddressCard.btnSubmit.set')
        }}
      </G-Button>
    </G-Card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { copyToClipboard } from '@/utils/utils'

export default {
  name: 'MyRefLinkCard',
  data() {
    return {
      withdrawAddressStatus: {
        NONE: 'none',
        CONFIRMATION: 'confirmation',
        CONFIRMED: 'confirmed'
      },
      statusClass: {
        none: 'badge-danger',
        confirmation: 'badge-warning',
        confirmed: 'badge-success'
      },
      addressType: 'launchpad_referral'
    }
  },
  computed: {
    ...mapGetters(['USER', 'USER_REFERRAL_LINK']),
    userreferralLink() {
      return (
        this.USER_REFERRAL_LINK?.uri || this.$t('myRefLinkCard.linkNotCreated')
      )
    }
  },
  methods: {
    ...mapActions({
      showGrandAddressDialog:
        'SET_VISIBILITY_SET_GRAND_WITHDRAWAL_WALLET_DIALOG'
    }),
    onCopyAddress() {
      copyToClipboard(this.userreferralLink)
      this.$notice({
        title: ' ',
        detail: this.$t('createRefLinkForm.copyMessage')
      })
    },
    onClickChangeGrandWallet() {
      this.showGrandAddressDialog({ show: true, addressType: this.addressType })
    }
  }
}
</script>

<style lang="scss">
.ref-link-and-referral-address {
  .my-ref-link-card {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-bottom: 0;

    &--title {
      display: block;
      font-weight: 800;
      font-size: 24px;
      line-height: 1;
      text-align: center;
      text-transform: uppercase;
      color: #53e29e;
      margin: 10px 0 20px;

      @media (max-width: 800px) {
        font-size: 20px;
      }
    }

    .card-header .card-title {
      text-align: center;
      color: var(--primary);
      font-weight: 500 !important;
    }
  }

  .referral-address-card {
    background-color: #53e29e;
    background-image: url(/img/background-2.png);
    background-position: center;
    background-size: cover;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    &--title {
      display: block;
      font-weight: 700;
      font-size: 24px;
      line-height: 1;
      text-align: center;
    }

    .address-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0 15px;
    }
  }
}
</style>
