<template>
  <G-Card class="create-ref-link-form" :title="$t('createRefLinkForm.title')">
    <div class="create-ref-link-form__content">
      <G-Checkbox v-model="agree" class="mx-auto w-fit mb-3">
        {{ $t('createRefLinkForm.checkBoxLavelAgree[0]') }}
        <router-link to="/affiliate">
          {{ $t('createRefLinkForm.checkBoxLavelAgree[1]') }}
        </router-link>
      </G-Checkbox>
      <G-Button
        size="lg"
        :disabled="!agree"
        :loading="loading"
        class="mb-3"
        @click="onClickGetNewRef"
      >
        {{
          USER_REFERRAL_LINK?.uri
            ? $t('createRefLinkForm.btnSubmit.getNew')
            : $t('createRefLinkForm.btnSubmit.get')
        }}
      </G-Button>
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
      <a
        href="https://t.me/grandtime_affiliates_support"
        target="_blank"
        class="d-block mt-3 w-fit"
      >
        {{ $t('createRefLinkForm.affiliatesSupportLink') }}
      </a>
    </div>
  </G-Card>
</template>

<script>
import { copyToClipboard } from '@/utils/utils'
import { mapGetters } from 'vuex'

export default {
  namr: 'CreateRefLinkForm',
  data() {
    return {
      loading: false,
      agree: false,
      addressType: 'launchpad_referral'
    }
  },
  computed: {
    ...mapGetters(['USER', 'USER_REFERRAL_LINK']),
    userreferralLink() {
      return (
        this.USER_REFERRAL_LINK?.uri ||
        this.$t('createRefLinkForm.linkNotCreated')
      )
    }
  },
  methods: {
    onCopyAddress() {
      copyToClipboard(this.userreferralLink)
      this.$notice({
        title: ' ',
        detail: this.$t('createRefLinkForm.copyMessage')
      })
    },
    async onClickGetNewRef(evt) {
      if (this.USER.misc?.wallets[this.addressType] != 'confirmed') {
        this.showNeedWalletPopup(evt)
        return
      }

      this.loading = true
      try {
        await this.$store.dispatch('GENERATE_USER_REFERRAL_LINK')
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    showNeedWalletPopup(evt) {
      this.$confirm.require({
        target: evt.currentTarget || evt.target,
        message: this.$t('createRefLinkForm.setWalletPopupText'),
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
    }
  }
}
</script>

<style lang="scss">
.create-ref-link-form {
  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .card-header .card-title {
    text-align: center;
    color: var(--primary);
    font-weight: 500 !important;
  }
}
</style>
