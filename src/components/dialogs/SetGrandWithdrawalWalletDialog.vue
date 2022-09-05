<template>
  <G-Modal
    :show="show"
    :key="formKey"
    :title="$t('setGrandWithdrawalWalletDialog.header')"
    class="set-grand-withdrawal-wallet-dialog"
    maxWidth="500px"
    :loading="modalLoading"
    @click:btn-close="onClose"
  >
    <transition
      name="change-step"
      mode="out-in"
      :style="{ '--x': step ? '-100%' : '100%' }"
    >
      <div :key="step" class="set-grand-withdrawal-wallet-dialog__body">
        <div
          v-show="step === 0"
          class="set-grand-withdrawal-wallet-dialog__step-one"
        >
          <p
            v-if="canChangeAddress"
            class="set-grand-withdrawal-wallet-dialog__step-description"
          >
            {{ $t('setGrandWithdrawalWalletDialog.description[0]') }}
            <span class="text-success">
              {{ $t('setGrandWithdrawalWalletDialog.description[1]') }}
            </span>
            {{ $t('setGrandWithdrawalWalletDialog.description[2]') }}
          </p>
          <G-Input
            v-model="form.address"
            :readonly="!canChangeAddress"
            ref="address"
            :rules="[rules.required, rules.minLength]"
            :label="$t('setGrandWithdrawalWalletDialog.addressLabel')"
            :placeholder="
              $t('setGrandWithdrawalWalletDialog.addressPlaceholder')
            "
            class="form-item mb-3"
          />
          <template v-if="canChangeAddress">
            <G-Input
              v-model="form.address2"
              ref="addressTwo"
              :rules="[rules.required, rules.mismatch]"
              :label="$t('setGrandWithdrawalWalletDialog.addressConfirmLabel')"
              :placeholder="
                $t('setGrandWithdrawalWalletDialog.addressConfirmPlaceholder')
              "
              class="form-item"
            />
            <p class="set-grand-withdrawal-wallet-dialog__step-sutitle">
              {{ $t('setGrandWithdrawalWalletDialog.sutitle') }}
            </p>
            <p
              class="set-grand-withdrawal-wallet-dialog__step-description text-center"
            >
              {{ $t('setGrandWithdrawalWalletDialog.stepOneDescription') }}
            </p>
            <WalletConnectButton
              @walletReceived="onGetWallet"
              class="walletconnect-btn"
            />
            <G-Checkbox
              v-model="form.agreement"
              ref="agreement"
              :rules="[rules.required]"
              class="w-fit m-auto"
            >
              {{ $t('setGrandWithdrawalWalletDialog.agreementLabel[0]') }}
              <router-link to="/">{{
                $t('setGrandWithdrawalWalletDialog.agreementLabel[1]')
              }}</router-link>
            </G-Checkbox>
          </template>
          <template v-else>
            <p class="set-grand-withdrawal-wallet-dialog__step-description">
              {{ $t('setGrandWithdrawalWalletDialog.cantChangeAddress[0]') }}
            </p>
            <p
              class="set-grand-withdrawal-wallet-dialog__step-description mb-0"
            >
              {{ $t('setGrandWithdrawalWalletDialog.cantChangeAddress[1]') }}
            </p>
          </template>
        </div>
        <div
          v-if="step === 1"
          class="set-grand-withdrawal-wallet-dialog__step-two"
        >
          <p class="set-grand-withdrawal-wallet-dialog__step-description">
            {{ $t('setGrandWithdrawalWalletDialog.stepTwoDescription') }}
          </p>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/39GUj3Zsa7E?controls=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="mb-3"
          ></iframe>
          <G-Input
            v-model="grandTokenAddress"
            :label="$t('setGrandWithdrawalWalletDialog.grandTokenAddressLabel')"
            readonly
            class="form-item"
          >
            <template #append>
              <i class="pi pi-copy copy-address-btn" @click="onCopyAddress"></i>
            </template>
          </G-Input>
        </div>
        <CardActionsСompleted
          v-if="step === 2"
          :text="$t('setGrandWithdrawalWalletDialog.cardActionsСompletedText')"
          class="set-grand-withdrawal-wallet-dialog__step-last"
        />
      </div>
    </transition>
    <template #footer v-if="canChangeAddress">
      <transition
        name="change-step"
        mode="out-in"
        :style="{ '--x': step ? '100%' : '-100%' }"
      >
        <div
          v-if="[0, 1].includes(step)"
          :key="step"
          class="set-grand-withdrawal-wallet-dialog__actions"
        >
          <template v-if="step === 0">
            <G-Button
              class="set-grand-withdrawal-wallet-dialog__actions--item"
              color="dark"
              outline
              @click="step = 1"
            >
              {{ $t('setGrandWithdrawalWalletDialog.btnNoWallet') }}
            </G-Button>
            <G-Button
              class="set-grand-withdrawal-wallet-dialog__actions--item"
              :loading="loading"
              @click="onSubmit"
            >
              {{ $t('setGrandWithdrawalWalletDialog.btnConfirmWallet') }}
            </G-Button>
          </template>
          <G-Button
            v-else
            @click="goBack"
            outline
            color="dark"
            class="set-grand-withdrawal-wallet-dialog__actions--item back"
            :class="{ 'w-fit': step === 1 }"
          >
            {{ $t('setGrandWithdrawalWalletDialog.btnSetWallet') }}
          </G-Button>
        </div>
      </transition>
    </template>
  </G-Modal>
</template>

<script>
import GModal from '@/components/ui-elements/GModal.vue'
import CardActionsCompleted from '@/components/cards/CardActionsСompleted.vue'
import WalletConnectButton from '@/components/WalletConnectButton.vue'
import { copyToClipboard } from '@/utils/utils.js'
import {
  required,
  minLength,
  mismatch,
  isThisRefsValid
} from '@/utils/fields-rules.js'

export default {
  name: 'SetGrandWithdrawalWalletDialog',
  components: { GModal, CardActionsCompleted, WalletConnectButton },
  data() {
    return {
      canChangeAddress: true,
      step: 0,
      formKey: 0,
      loading: false,
      modalLoading: false,
      form: {
        address: '',
        address2: '',
        agreement: true
      },
      grandTokenAddress: import.meta.env.VITE_GRAND_TOKEN_ADDRESS,
      rules: {
        required,
        minLength: (v) => minLength(v, 42),
        mismatch: (v) => mismatch(v, this.form.address, 'address')
      }
    }
  },
  computed: {
    show: {
      get() {
        const { show } =
          this.$store.getters.VISIBILITY_SET_GRAND_WITHDRAWAL_WALLET_DIALOG
        return show
      },
      set(val) {
        this.$store.dispatch(
          'SET_VISIBILITY_SET_GRAND_WITHDRAWAL_WALLET_DIALOG',
          { show: val }
        )
      }
    },
    addressType() {
      const { addressType } =
        this.$store.getters.VISIBILITY_SET_GRAND_WITHDRAWAL_WALLET_DIALOG
      return addressType || ''
    }
  },
  methods: {
    onGetWallet(wallet) {
      this.form.address = wallet
      this.form.address2 = wallet
    },
    async onSubmit() {
      const valid = isThisRefsValid(this.$refs)
      if (valid) {
        this.loading = true
        try {
          await this.$api.user.setWalletAddressByType({
            ...this.form,
            type: this.addressType
          })
          this.$store.dispatch('GET_USER')
          this.step = 2
        } catch (err) {
          console.log(err)
        } finally {
          this.loading = false
        }
      }
    },
    onCopyAddress() {
      copyToClipboard(this.grandTokenAddress)
      this.$notice({
        title: ' ',
        detail: this.$t('setGrandWithdrawalWalletDialog.noticeCopy')
      })
    },
    goBack() {
      this.step = 0
    },
    onClose() {
      this.resetForm()
      this.show = false
    },
    resetForm() {
      Object.keys(this.form).forEach((el) => (this.form[el] = ''))
      this.loading = false
      this.formKey += 1
      this.step = 0
    },
    async initialize() {
      try {
        this.modalLoading = true
        const { ordering, withdrawal_requests } =
          await this.$api.user.checkAddressActivity(this.addressType)
        const withdrawAddress = await this.$api.user.getWalletAddressByType(
          this.addressType
        )
        this.form.address = withdrawAddress || ''
        this.canChangeAddress = !ordering && !withdrawal_requests
      } catch (err) {
        err
      } finally {
        setTimeout(() => {
          this.modalLoading = false
        }, 300)
      }
    }
  },
  watch: {
    show: {
      immediate: false,
      async handler(val) {
        if (val) {
          this.initialize()
        }
      }
    }
  }
}
</script>

<style lang="scss">
.set-grand-withdrawal-wallet-dialog {
  .p-dialog-title {
    display: block;
    text-transform: uppercase;
    text-align: center;
    margin: 0 auto;
    color: var(--primary);
  }

  .p-dialog-header-close {
    position: absolute !important;
    top: 5px;
    right: 5px;
  }

  .p-dialog-content {
    overflow: hidden;
  }

  .p-dialog-footer {
    overflow: hidden;
    .g-button {
      width: 100%;
    }
  }

  .walletconnect-btn {
    width: fit-content;
    margin: 0 auto 20px;
  }

  .copy-address-btn {
    font-size: 21px;
    color: var(--primary);
    display: block;
    cursor: pointer;
    transform-origin: top;
    transform-box: 100px;
    transition: 0.3s;

    &:hover {
      text-shadow: 0 0 1px #004895;
    }
    &:active {
      color: darken(#004895, 10%);
    }
  }

  &__step-sutitle {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 1;
    color: var(--primary);
    margin: 26px 0 20px;

    &:before,
    &::after {
      content: '';
      width: 100%;
      height: 1px;
      background-color: var(--primary);
    }
  }

  &__step-description {
    font-size: 13px;
    font-weight: 500;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    &--item {
      margin: 0 !important;
    }
  }

  .change-step {
    &-enter-active,
    &-leave-active {
      transition: all 0.5s;
    }

    &-enter-from,
    &-leave-to {
      transform: translateX(var(--x));
      opacity: 0;
    }
  }
}
</style>
