<template>
  <G-Card
    :title="$t('affiliateReferredStatusCard.title')"
    class="affiliate-referred-status-card"
  >
    <div class="affiliate-referred-status-card__content">
      <div class="affiliate-referred-status-card__content--item">
        <span class="item-name">
          {{ $t('affiliateReferredStatusCard.peopleReferred') }}
        </span>
        <span class="item-value">{{ affiliateData.referralsCount }}</span>
      </div>
      <div class="affiliate-referred-status-card__content--item">
        <span class="item-name">
          {{ $t('affiliateReferredStatusCard.referralEarnings') }}
        </span>
        <span class="item-value">
          {{ affiliateData.ethEarned }} <small>MATIC</small>
        </span>
      </div>
    </div>
  </G-Card>
</template>

<script>
export default {
  name: 'AffiliateReferredStatusCard',
  data() {
    return {
      affiliateData: {}
    }
  },
  async mounted() {
    const { referralsCount, ethEarned } =
      await this.$api.referral.getAffiliateData()
    this.affiliateData = { referralsCount, ethEarned }
  }
}
</script>

<style lang="scss">
.affiliate-referred-status-card {
  &__content {
    display: flex;

    &--item {
      width: 100%;

      .item-name,
      .item-value {
        display: block;
        font-weight: 600;
        line-height: 1.2;
      }

      .item-name {
        font-size: 12px;
        color: #878da3;
        margin-bottom: 10px;
      }

      .item-value {
        font-size: 24px;

        small {
          font-size: 13px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
