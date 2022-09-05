<template>
  <G-Card
    :title="$t('affiliateProgramInfoCard.title')"
    class="affiliate-program-info-card"
  >
    <p class="affiliate-program-info-card--description">
      {{ $t("affiliateProgramInfoCard.description") }}
    </p>
    <G-Button
      color="success"
      size="lg"
      tag="router-link"
      to="/affiliate"
      class="affiliate-program-info-card--btn"
    >
      {{ $t("affiliateProgramInfoCard.link") }}
    </G-Button>
  </G-Card>
</template>

<script>
export default {
  name: "AffiliateProgramInfoCard",
};
</script>

<style lang="scss">
.affiliate-program-info-card {
  background-color: rgba(58, 175, 248, 0.2) !important;
  background-image: url(/img/background.png);
  background-blend-mode: overlay;
  background-position: 70% 55%;
  background-size: 130%;
  color: #fff;
  .card-header {
    background-color: unset !important;
  }

  &--description {
    font-size: 14px;
  }

  &--btn {
    max-width: fit-content;
  }
}
</style>
