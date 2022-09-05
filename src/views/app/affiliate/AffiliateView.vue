<template>
  <AppViewWrapper class="affiliate-view">
    <AffiliateReferredStatusCard />

    <G-Card
      :title="$t('aboutAffiliateProgram.title')"
      class="affiliate-view__about-affiliate"
    >
      {{ $t('aboutAffiliateProgram.description') }}
    </G-Card>

    <div class="affiliate-view__ref-forms">
      <CreateRefLinkForm class="affiliate-view__ref-forms--item" />
      <MyRefLinkCard class="affiliate-view__ref-forms--item" />
    </div>

    <G-Card :title="$t('launchpadTransactionsTable.title')">
      <ReferralTransactionsTable />
    </G-Card>
  </AppViewWrapper>
</template>

<script>
import AffiliateReferredStatusCard from '@/views/app/affiliate/components/AffiliateReferredStatusCard.vue'
import AppViewWrapper from '@/components/app/AppViewWrapper.vue'
import ReferralTransactionsTable from '@/components/tables/ReferralTransactionsTable.vue'
import CreateRefLinkForm from '@/views/app/affiliate/components/CreateRefLinkForm.vue'
import MyRefLinkCard from '@/views/app/affiliate/components/MyRefLinkCard.vue'

export default {
  name: 'AffiliateView',
  components: {
    AppViewWrapper,
    AffiliateReferredStatusCard,
    ReferralTransactionsTable,
    CreateRefLinkForm,
    MyRefLinkCard
  },
  created() {
    this.$store.dispatch('GET_USER_REFERRAL_LINK')
  }
}
</script>

<style lang="scss">
.affiliate-view {
  &__about-affiliate {
    background-color: rgba(58, 175, 248, 0.2) !important;
    background-image: url(/img/background.png);
    background-blend-mode: overlay;
    background-position: 70% 55%;
    background-size: 130%;
    color: #fff;

    .card-header {
      background-color: transparent !important;
    }
  }

  &__ref-forms {
    display: flex;
    gap: 30px;

    @media (max-width: 800px) {
      flex-direction: column;
      gap: 0;
    }

    &--item {
      width: 100%;
    }
  }
}
</style>
