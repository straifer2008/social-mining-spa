<template>
  <AppViewWrapper class="launchpad-view">
    <PhaseInfoCard />

    <WelcomeCard />

    <InvestCards />

    <AffiliateProgramInfoCard />

    <G-Card :title="$t('launchpadTransactionsTable.title')">
      <LaunchpadTransactionsTable />
    </G-Card>
  </AppViewWrapper>
</template>

<script>
import AppViewWrapper from '@/components/app/AppViewWrapper.vue'
import PhaseInfoCard from '@/components/PhaseInfoCard.vue'
import WelcomeCard from '@/views/app/launchpad/components/WelcomeCard.vue'
import LaunchpadTransactionsTable from '@/components/tables/LaunchpadTransactionsTable.vue'
import AffiliateProgramInfoCard from '@/views/app/launchpad/components/AffiliateProgramInfoCard.vue'
import InvestCards from '@/views/app/launchpad/components/InvestCards.vue'

export default {
  name: 'LaunchpadView',
  components: {
    AppViewWrapper,
    PhaseInfoCard,
    WelcomeCard,
    LaunchpadTransactionsTable,
    AffiliateProgramInfoCard,
    InvestCards
  },
  created() {
    this.$store.dispatch('GET_PHASE_INFO')
  }
}
</script>
