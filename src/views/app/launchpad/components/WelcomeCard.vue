<template>
  <G-Card :title="$t('launchpadWelcomeCard.title')" class="welcome-card">
    <p class="welcome-card--description">
      {{ $t('launchpadWelcomeCard.description') }}
    </p>

    <template #footer>
      <div class="welcome-card__footer">
        <div class="welcome-card__footer--left-block">
          <span class="left-block-name welcome-card__footer--subtitle">{{
            $t('launchpadWelcomeCard.account')
          }}</span>
          <span class="left-block-value">{{ user?.id }}</span>
        </div>
        <div class="welcome-card--divider"></div>
        <div class="welcome-card__footer--right-block">
          <div class="right-block-info">
            <span
              class="right-block-info--title welcome-card__footer--subtitle"
            >
              {{ $t('launchpadWelcomeCard.tokenAddress') }}
            </span>
            <span
              class="right-block-info--status badge badge-pill"
              :class="statusClass[user?.misc?.wallets.launchpad|| withdrawAddressStatus.NONE]"
            >
              {{
                $t(
                  `launchpadWelcomeCard.statuses.${
                    user?.misc?.wallets.launchpad || withdrawAddressStatus.NONE
                  }`
                )
              }}
            </span>
          </div>
          <G-Button
            color="primary"
            :disabled="!user?.is_confirmed"
            @click="onClickChangeGrandWallet"
          >
            {{
              user?.misc?.wallets.launchpad !== 'none'
                ? $t('launchpadWelcomeCard.btnChange')
                : $t('launchpadWelcomeCard.btnSet')
            }}
          </G-Button>
        </div>
      </div>
    </template>
  </G-Card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'WelcomeCard',
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
      addressType: 'launchpad'
    }
  },
  methods: {
    ...mapActions({
      showGrandAddressDialog:
        'SET_VISIBILITY_SET_GRAND_WITHDRAWAL_WALLET_DIALOG'
    }),
    onClickChangeGrandWallet() {
      this.showGrandAddressDialog({ show: true, addressType: this.addressType })
    }
  },
  computed: {
    ...mapGetters({ user: 'USER' })
  }
}
</script>

<style lang="scss">
.welcome-card {
  .card-header {
    background: linear-gradient(355deg, #3aaff8, #143fef);
    color: #fff;
  }

  &--description {
    font-size: 14px;
  }

  &__footer {
    display: flex;
    @media (max-width: 485px) {
      flex-direction: column;
      gap: 4px;
    }

    &--subtitle {
      display: block;
      font-weight: 700;
      font-size: 13px;
      line-height: 20px;
      color: #878da3;
    }

    &--left-block,
    &--right-block {
      width: 100%;
    }

    &--left-block {
      @media (max-width: 720px) {
        width: fit-content;
      }

      .left-block-name {
        margin-bottom: 10px;
      }

      .left-block-value {
        font-size: 24px;
        line-height: 18px;
        font-weight: normal;
      }
    }

    &--right-block {
      .right-block-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;

        &--status {
          font-size: 12px;
        }
      }
    }
  }

  &--divider {
    width: 1px;
    background-color: #c4c4c459;
    margin: 0 20px;
  }
}
</style>
