<template>
  <G-Card
    class="status-card"
    :class="{ 'ribbon-vertical-left-wrapper': data.active }"
  >
    <div class="status-card--content">
      <div
        v-if="data.active"
        class="ribbon ribbon-bookmark ribbon-vertical-left ribbon-primary"
      >
        <i class="icon-check" style="font-size: 20px"></i>
      </div>
      <div class="item-top">
        <vue-feather class="item-top--icon" :type="data.icon"></vue-feather>
        <span class="item-top--name">{{ data.name }}</span>
      </div>
      <div class="item-bottom">
        <div class="item-bottom__row">
          <span class="item-bottom--name">
            {{ $t('statusCard.partnerLevel') }}
          </span>
          <b class="item-bottom--value">{{ data.level }}</b>
        </div>
        <div class="item-bottom__row">
          <span class="item-bottom--name">
            {{ $t('statusCard.balanceRequired') }}
          </span>
          <b class="item-bottom--value">{{ data.balance }}</b>
        </div>
      </div>
    </div>
  </G-Card>
</template>

<script>
export default {
  name: 'StatusCard',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss">
.status-card {
  &.ribbon-vertical-left-wrapper {
    border: 2px solid var(--primary);
  }

  &--content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .item-top {
    display: flex;
    align-items: center;
    gap: 10px;

    &--icon {
      color: var(--primary);
    }

    &--name {
      font-size: 18px;
      font-weight: 600;
    }
  }

  .item-bottom {
    max-width: 265px;
    width: 100%;
    &__row {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    &--value {
      white-space: nowrap;
    }
  }
}
</style>
