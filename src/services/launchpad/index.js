function getTokenPriceInUSD(iteration) {
  let price = 0
  let stepPrice = 0

  if (iteration === 0) {
    price = 5
  } else if (iteration === 1) {
    price = 10
    stepPrice = 0
  } else if (iteration > 1 && iteration <= 100) {
    price = 10
    stepPrice = iteration - 1
  } else if (iteration === 101) {
    price = 110
    stepPrice = 0
  } else {
    price = 110
    stepPrice = (iteration - 101) * 10
  }

  return (price + stepPrice) / 10 ** 4
}

function getTokensAmount(iteration) {
  if (iteration === 0) {
    return 10 * 10 ** 6
  } else if (iteration > 0 && iteration <= 100) {
    return 19 * 10 ** 5
  } else {
    return 8 * 10 ** 6
  }
}

export function totalRaisedUsdCalculate({ iteration, phaseSold, tokenPrice }) {
  let amount = 0

  for (let i = 0; i < iteration - 1; i++) {
    amount += getTokensAmount(i) * getTokenPriceInUSD(i)
  }

  return amount + phaseSold * tokenPrice
}
