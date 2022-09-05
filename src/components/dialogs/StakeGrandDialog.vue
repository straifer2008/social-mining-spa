<template>
  <G-Modal
    :show="show"
    :key="formKey"
    :title="$t('stakeGrandDialog.title')"
    class="stake-grand-dialog"
    maxWidth="500px"
    @click:btn-close="onClose"
  >
    <transition
      name="change-step"
      mode="out-in"
      :style="{ '--x': step ? '-100%' : '100%' }"
    >
      <div>
        <div class="stake-grand-dialog__stakes">
          <div
            v-for="(stake, index) in stakePeriod"
            class="stake-grand-dialog__stakes--stake"
            :class="{
              active: stake.active === 1
            }"
            @click="stakePick(index)"
            :key="index"
          >
            <div class="stake-grand-dialog__stakes--stake-period">
              {{ stake.period }}
            </div>
            <div class="stake-grand-dialog__stakes--stake-hr"></div>
            <div class="stake-grand-dialog__stakes--stake-percent">
              {{ stake.stake }}
            </div>
          </div>
        </div>

        <h3>I want to stake:</h3>

        <div class="stake-grand-dialog__buttons">
          <G-Input
            v-model.number="form.amount"
            ref="amount"
            type="number"
            :rules="[rules.required, rules.min, rules.max]"
            placeholder="0"
            class="stake-grand-dialog__buttons--input"
          />

          <G-Button
            class="stake-grand-dialog__buttons--button"
            :loading="loading"
            @click="onSubmit"
          >
            {{ $t('stakeGrandDialog.submit') }}
          </G-Button>
        </div>

      </div>
    </transition>

  </G-Modal>
</template>

<script>
import GModal from '@/components/ui-elements/GModal.vue'

import { mapGetters } from 'vuex'
import { required, min, max, isThisRefsValid } from '@/utils/fields-rules.js'
import CardActionsCompleted from '@/components/cards/CardActionsСompleted.vue'

export default {
  name: 'StakeGrandDialog',
  components: { GModal, CardActionsCompleted },
  data() {
    return {
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
      },
      stakePeriod: [
        {
          period: '30 days',
          stake: '3% APY',
          active: 0,
        },
        {
          period: '180 days',
          stake: '10% APY',
          active: 1,
        },
        {
          period: '360 days',
          stake: '15% APY',
          active: 0,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({ userBalance: 'BALANCE_NORMALIZE' }),
    show: {
      get() {
        return this.$store.getters.VISIBILITY_STAKE_GRAND_DIALOG
      },
      set(val) {
        this.$store.dispatch('SET_VISIBILITY_STAKE_GRAND_DIALOG', val)
      }
    }
  },
  methods: {
    stakePick(index) {
      this.stakePeriod.map( item => {
        item.active = 0
      })
      this.stakePeriod[index].active = 1
    },
    async onSubmit() {
      /*const valid = isThisRefsValid(this.$refs)
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
      }*/
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
.stake-grand-dialog {
  &__stakes {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    &--stake {
      flex-basis: 30%;
      border-radius: 10px;
      height: 100px;
      background-color: #acd9fc;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 10px;
      cursor: pointer;

      &.active {
        background-color: #3279fd;

        .stake-grand-dialog__stakes--stake-percent {
          color: #fff;
        }
      }

      &-period {
        flex-basis: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: 800;
      }
      &-hr {
        width: 50px;
        height: 0;
        border: 1px solid #808080;
      }
      &-percent {
        flex-basis: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: 800;
        color: #3279FD;
      }
    }
  }

  h3 {
    font-size: 18px;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  &__buttons {
    display: flex;
    gap: 20px;

    &--input {
      flex-basis: 60%;
    }
    &--button {
      flex-basis: 40%;
    }
  }
}
</style>
