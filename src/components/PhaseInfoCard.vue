<template>
  <G-Card :title="$t('phaseInfoCard.title')" class="launchpad-card phase-info-card">
    <div v-if="currentPhase" class="launchpad-card__body">
      <div class="launchpad-card__body--item">
        <div class="item-header">
          <span class="item-header--name">
            {{
              $t("phaseInfoCard.phaseOneOf", {
                phase: phaseInfo.getCurrentICOState.currentIteration,
              })
            }}
          </span>
          <span class="item-header--value badge badge-pill badge-primary">
            {{
              $t("phaseInfoCard.phasePercent", {
                percent: currentPhase.tokensSoldPercent,
              })
            }}
          </span>
        </div>
        <div class="item-footer">
          <span class="item-footer--name">
            {{ currentPhase.tokensSold.toFixed(2) }} <small>GRANDS</small>
          </span>
          <span class="item-footer--value badge badge-pill badge-primary">
            {{
              $t("phaseInfoCard.amountInPhase", {
                amount: currentPhase.tokens,
              })
            }}
          </span>
        </div>
      </div>

      <div class="launchpad-card__body--item">
        <div class="item-header">
          <span class="item-header--name"
            >{{ $t("phaseInfoCard.currentGrandPrice") }}
          </span>
        </div>
        <div class="item-footer">
          <span class="item-footer--name">
            ${{ currentPhase.tokenPrice }} <small>USD</small>
          </span>
          <span class="item-footer--value badge badge-pill badge-primary">
            {{
              $t("phaseInfoCard.priceInNextPhase", {
                price: phaseInfo.nextPhase.tokenPrice,
              })
            }}
          </span>
        </div>
      </div>

      <div class="launchpad-card__body--item">
        <div class="item-header">
          <span class="item-header--name">{{ $t("phaseInfoCard.totalCollected") }}</span>
        </div>
        <div class="item-footer">
          <span class="item-footer--name">
            ${{ totalRaisedUsd }} <small>USD</small>
          </span>
        </div>
      </div>
    </div>
  </G-Card>
</template>

<script>
import { totalRaisedUsdCalculate } from "@/services/launchpad/index.js";
import { mapGetters } from "vuex";

export default {
  name: "PhaseInfoCard",
  data() {
    return {
      totalRaisedUsdCalculate,
    };
  },
  computed: {
    ...mapGetters({ phaseInfo: "PHASE_INFO" }),
    currentPhase() {
      return this.phaseInfo?.currentPhase;
    },
    totalRaisedUsd() {
      const iteration = this.phaseInfo?.getCurrentICOState?.currentIteration;
      const phaseSold = this.currentPhase?.tokensSoldValue;
      const tokenPrice = this.currentPhase?.tokenPrice;
      let result = 0;
      if (tokenPrice) {
        result = totalRaisedUsdCalculate({ iteration, phaseSold, tokenPrice });
      }
      return result.toFixed(2);
    },
  },
};
</script>

<style lang="scss">
.phase-info-card {
}

.launchpad-card {
  &__body {
    display: flex;
    justify-content: space-between;

    @media (max-width: 1250px) {
      gap: 30px;
      flex-direction: column;
      align-items: center;
    }

    &--item {
      min-width: 200px;
      display: flex;
      flex-direction: column;
      gap: 15px;

      @media (max-width: 1250px) {
        max-width: 400px;
        width: 100%;
      }

      .item-header,
      .item-footer {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .item-header {
        &--name {
          font-weight: 700;
          font-size: 12px;
          line-height: 20px;
          color: #878da3;
        }
        &--value {
        }
      }

      .item-footer {
        &--name {
          font-weight: 700;
          font-size: 24px;
          line-height: 1;

          small {
            font-size: 13px;
            font-weight: 600;
            line-height: 1;
            letter-spacing: 0px;
          }
        }
        &--value {
        }
      }
    }
  }
}
</style>
