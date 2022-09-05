<template>
  <div class="invest-cards">
    <p class="invest-cards--title">{{ $t("investCards.title") }}</p>
    <div class="invest-cards__list">
      <div v-for="item in items" :key="item.type" class="invest-cards__list--item">
        <span class="item-title">{{ $t(item.title) }}</span>
        <picture class="item-image--wrap">
          <img
            :src="item.image.src"
            alt="image"
            :width="item.image.width"
            :height="item.image.height"
            class="item-image"
          />
        </picture>
        <G-Button
          class="item-image"
          size="lg"
          color="success"
          :disabled="item.disabled"
          @click="onClick(item.type)"
        >
          {{ $t(item.btnName) }}
        </G-Button>
      </div>
    </div>
    <p class="invest-cards--apped-text">
      {{ $t("investCards.appedText") }}
      <a href="mailto:business@grandtime.org" class="apped-text-link">
        business@grandtime.org
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: "InvestCards",
  computed: {
    items() {
      return [
        {
          title: "investCards.investMethods.coinpayments.title",
          image: {
            src: "/img/invest-image/coinpayments.png",
            width: "120",
            height: "80",
          },
          type: "coinpayments",
          btnName: "investCards.investMethods.coinpayments.btnName",
          disabled: true,
        },
        {
          title: "investCards.investMethods.matic.title",
          image: {
            src: "/img/invest-image/metamask.svg",
            width: "77",
            height: "80",
          },
          type: "matic",
          btnName: "investCards.investMethods.matic.btnName",
          disabled: false,
        },
        {
          title: "investCards.investMethods.card.title",
          image: {
            src: "/img/invest-image/credit-card.svg",
            width: "90",
            height: "60",
          },
          type: "card",
          btnName: "investCards.investMethods.card.btnName",
          disabled: false,
        },
      ];
    },
  },
  methods: {
    onClick(type) {
      console.log("onClick type: ", type);
    },
  },
};
</script>

<style lang="scss">
.invest-cards {
  margin-bottom: 30px;

  &--title {
    font-size: 24px;
    line-height: 1;
    text-align: center;
    margin: 0;
  }

  &--apped-text {
    font-size: 18px;
    line-height: 1.5;
    text-align: center;
    text-shadow: 1px 1px 0px #969696, 1px 1px 0px #969696;
    margin: 0;
  }

  &__list {
    display: flex;
    gap: 30px;
    margin: 20px 0;

    @media (max-width: 1500px) {
      flex-wrap: wrap;
      justify-content: center;
    }

    &--item {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      border-radius: 5px;
      border-top: 8px solid #22af47;
      box-shadow: 0 4px 25px #26323d26;
      background: radial-gradient(circle, #0066e6 0%, #3db9ff 100%);
      padding: 30px 45px;

      @media (max-width: 1500px) {
        max-width: 500px;
      }

      .item-title {
        font-size: 24px;
        font-weight: normal;
        line-height: 20px;
        color: #fff;
      }
    }
  }
}
</style>
