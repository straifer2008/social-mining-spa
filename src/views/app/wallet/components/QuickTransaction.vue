<template>
    <div class="transactions">
        <h5>
            Quick Transaction
            <span class="badge">Soon</span>
        </h5>

        <div class="inputs">
            <div class="input">
                <G-Input
                    v-model="from"
                    label="From"
                    placeholder="0"
                    currencySelect
                />
                <G-Select
                    placeholder="GRAND"
                    v-model="list1Value"
                    :items="currencies"
                    currencySelect
                />
            </div>

            <img
                width="30"
                height="30"
                :src="`/img/icons/exchange.svg`"
                alt="exchange-icon"
                style="margin-bottom: 5px; "
            />

            <div class="input">
                <G-Input
                    v-model="to"
                    label="To"
                    placeholder="0"
                    currencySelect
                />
                <G-Select
                    placeholder="GRAND"
                    v-model="list1Value"
                    :items="currencies"
                    currencySelect
                />
            </div>

        </div>

        <div class="more">
            <i class="pi pi-plus" style="font-size: 16px"></i>
            <span>More settings</span>
        </div>

        <div class="button">
            Coming soon
        </div>

    </div>
</template>

<script>
export default {
  name: 'QuickTransaction',
  data() {
    return {
      currencies: [
        { name: 'GRAND', value: 'grand' },
        { name: 'ETH', value: 'eth' },
        { name: 'BTC', value: 'btc' },
        { name: 'LTC', value: 'ltc' },
        { name: 'MATIC', value: 'matic' },
        { name: 'BNB', value: 'bnb' },
        { name: 'SOL', value: 'sol' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
    .transactions {
        width: 100%;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        background-color: #fff;
        padding: 20px 20px 16px;

        h5 {
            color: #3DB9FF;
            font-weight: 600;
            font-size: 24px;
            text-align: center;
            margin-bottom: 20px;

            .badge {
                background-color: rgba(50, 121, 253, 0.25);
                border-radius: 0.9em;
                font-size: 12px;
                vertical-align: middle;
            }
        }

        .inputs {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            align-items: flex-end;

            .input {
                display: flex;
                position: relative;
            }
        }

        .more {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 30px;
            gap: 10px;
            color: rgba(0, 0, 0, 0.26);

        }

        .button {
            width: 100%;
            height: 50px;
            background-color: #dedfe0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(0, 0, 0, 0.26);
        }
    }
</style>
