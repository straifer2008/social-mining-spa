<template>
  <G-Modal
    :show="show"
    :key="formKey"
    :title="$t('transferGrandDialog.title')"
    class="transfer-grand-dialog"
    maxWidth="500px"
    @click:btn-close="onClose"
  >
    <transition
      name="change-step"
      mode="out-in"
      :style="{ '--x': step ? '-100%' : '100%' }"
    >
      <div :key="step" class="transfer-grand-dialog__body">
        <div v-show="step === 0" class="transfer-grand-dialog__step-one">
          <G-Input
            v-model="form.username"
            ref="username"
            :rules="[rules.required]"
            :label="$t('transferGrandDialog.labelUsername')"
            :placeholder="$t('transferGrandDialog.placeholderUsername')"
            class="form-item mb-3"
          />
          <G-Input
            v-model.number="form.value"
            ref="value"
            type="number"
            :rules="[rules.required, rules.min, rules.max]"
            :label="$t('transferGrandDialog.labelValue')"
            :placeholder="$t('transferGrandDialog.placeholderValue')"
            class="form-item"
          />
        </div>
        <div v-if="step === 1" class="transfer-grand-dialog__step-two">
          <div class="transfer-grand-dialog__step-two--media media">
            <div class="media-size-email">
              <img
                :src="step2Data.profile.photo || '/img/user.png'"
                alt="user avatar"
                loading="lazy"
                width="50"
                height="50"
                class="mr-3 rounded-circle img-50"
              />
            </div>
            <div class="media-body">
              <h6 class="f-w-600 m-0">{{ step2Data.profile.name }}</h6>
              <p class="m-0">ID: {{ step2Data.profile.id }}</p>
            </div>
          </div>
          <div class="transfer-grand-dialog__step-two--amount">
            <span class="amount-title">
              {{ $t('transferGrandDialog.amountTitle') }}
            </span>
            <b class="amount-value">{{ step2Data.amount }}</b>
          </div>
        </div>

        <CardActionsСompleted
          v-if="step === 2"
          :text="'запрос на P2P перевод отправлен успешно'"
          class="transfer-grand-dialog__step-last"
        />
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
          class="transfer-grand-dialog__actions"
        >
          <G-Button
            v-if="step === 1"
            @click="goBack"
            outline
            color="dark"
            class="transfer-grand-dialog__actions--item back"
          >
            {{ $t('transferGrandDialog.back') }}
          </G-Button>
          <G-Button
            class="transfer-grand-dialog__actions--item"
            :loading="loading"
            @click="onSubmit"
          >
            {{
              step === 0
                ? $t('transferGrandDialog.send')
                : $t('transferGrandDialog.confirm')
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

import {
  required,
  min,
  max,
  isThisRefsValid,
  apiFieldsErrorHandler
} from '@/utils/fields-rules.ts'
import CardActionsCompleted from '@/components/cards/CardActionsСompleted.vue'

export default {
  name: 'TransferGrandDialog',
  components: { GModal, CardActionsCompleted },
  data() {
    return {
      step: 0,
      formKey: 0,
      loading: false,
      step2Data: null,
      form: {
        username: '',
        value: ''
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
        return this.$store.getters.VISIBILITY_TRANSFER_GRAND_DIALOG
      },
      set(val) {
        this.$store.dispatch('SET_VISIBILITY_TRANSFER_GRAND_DIALOG', val)
      }
    }
  },
  methods: {
    async onSubmit() {
      const valid = isThisRefsValid(this.$refs)
      if (valid) {
        this.loading = true
        if (this.step === 0) {
          try {
            const { amount, profile } = await this.$api.transactions.p2pStart(
              this.form
            )
            this.step2Data = { amount, profile }
            this.step = 1
          } catch (err) {
            apiFieldsErrorHandler({
              errors: err.data.errors,
              refs: this.$refs
            })
          } finally {
            this.loading = false
          }
        } else {
          try {
            await this.$store.dispatch('CONFIRM_2P2', this.form)
            this.step = 2
          } catch (err) {
            apiFieldsErrorHandler({
              errors: err.data.errors,
              refs: this.$refs
            })
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
.transfer-grand-dialog {
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
    display: flex;
    flex-direction: column;
    justify-content: center;

    &--media {
      display: flex;
      align-items: center;
      width: fit-content;
      margin: 0 auto;
    }

    &--amount {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
    }
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
