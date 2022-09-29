<template>
  <G-Modal
    :show="show"
    :key="formKey"
    :title="$t('withdrawalGrandDialog.title')"
    class="withdrawal-grand-dialog"
    maxWidth="500px"
    @click:btn-close="onClose"
  >
    <transition
      name="change-step"
      mode="out-in"
      :style="{ '--x': step ? '-100%' : '100%' }"
    >
      <div :key="step" class="withdrawal-grand-dialog__body">
        <div v-show="step === 0" class="withdrawal-grand-dialog__step-one">
          <G-Input
            v-model="form.address"
            ref="address"
            :rules="[rules.required]"
            :label="$t('withdrawalGrandDialog.labelAddress')"
            readonly
            class="form-item mb-3"
          />
          <G-Input
            v-model.number="form.amount"
            ref="amount"
            type="number"
            :rules="[rules.required, rules.min, rules.max]"
            :label="$t('withdrawalGrandDialog.labelAmount')"
            :placeholder="$t('withdrawalGrandDialog.placeholderAmount')"
            class="form-item"
          />
        </div>

        <div v-if="step === 1" class="withdrawal-grand-dialog__step-two">
          <h5 class="withdrawal-grand-dialog__step-two--title">
            {{ $t('withdrawalGrandDialog.stepOne.title') }}
          </h5>
          <p class="withdrawal-grand-dialog__step-two--description mb-0">
            {{ $t('withdrawalGrandDialog.stepOne.description') }}
          </p>
        </div>

        <div v-if="step === 2" class="withdrawal-grand-dialog__step-two">
          <Card-ActionsСompleted
            :text="$t('withdrawalGrandDialog.stepTwo.description')"
          />
        </div>
      </div>
    </transition>

    <template #footer>
      <transition
        name="change-step"
        mode="out-in"
        :style="{ '--x': step ? '100%' : '-100%' }"
      >
        <div
          v-if="[0, 1].includes(step)"
          :key="step"
          class="withdrawal-grand-dialog__actions"
        >
          <G-Button
            v-if="step != 0"
            @click="goBack"
            outline
            color="dark"
            class="withdrawal-grand-dialog__actions--item back"
          >
            {{ $t('withdrawalGrandDialog.back') }}
          </G-Button>
          <G-Button
            class="withdrawal-grand-dialog__actions--item"
            :loading="loading"
            @click="onSubmit"
          >
            {{
              step === 0
                ? $t('withdrawalGrandDialog.confirm')
                : $t('withdrawalGrandDialog.stepOne.confirm')
            }}
          </G-Button>
        </div>
      </transition>
    </template>
  </G-Modal>
</template>

<script>
import GModal from '@/components/ui-elements/GModal.vue'

import { mapGetters } from 'vuex'
import { required, min, max, isThisRefsValid } from '@/utils/fields-rules.ts'
import CardActionsCompleted from '@/components/cards/CardActionsСompleted.vue'

export default {
  name: 'WithdrawalGrandDialog',
  components: { GModal, CardActionsCompleted },
  data() {
    return {
      step: 0,
      formKey: 0,
      loading: false,
      step2Data: null,
      form: {
        address: '',
        amount: ''
      },
      minValue: 1,
      maxValue: 2,
      rules: {
        required,
        min: (v) => min(v, this.minValue),
        max: (v) => max(v, this.maxValue)
      }
    }
  },
  computed: {
    ...mapGetters({ userBalance: 'BALANCE_NORMALIZE' }),
    show: {
      get() {
        return this.$store.getters.VISIBILITY_WITHDRAWAL_GRAND_DIALOG
      },
      set(val) {
        this.$store.dispatch('SET_VISIBILITY_WITHDRAWAL_GRAND_DIALOG', val)
      }
    }
  },
  methods: {
    async onSubmit() {
      const valid = isThisRefsValid(this.$refs)
      if (valid) {
        this.loading = true
        if (this.step === 0) {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.step = 1
          }, 500)
        } else {
          try {
            await this.$store.dispatch('WITHDRAWSL_GRAND', this.form)
            this.step = 2
            // this.resetForm()
          } catch (err) {
            console.log(err)
          } finally {
            this.loading = false
          }
        }
      }
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
    }
  },
  watch: {
    async show(val) {
      if (val) {
        this.form.address = await this.$api.user.getWalletAddressByType(
          'launchpad'
        )
      }
    },
    userBalance: {
      immediate: true,
      handler(val) {
        if (val?.grand) {
          this.maxValue = val.grand.value
        }
      }
    }
  }
}
</script>

<style lang="scss">
.withdrawal-grand-dialog {
  .p-dialog-title {
    display: block;
    text-transform: uppercase;
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

  &__step-two {
    min-height: 146px;
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
