import { objectToString } from '@vue/shared'
import { BaseApiService } from './core/BaseApiService'

const checkAuth = true

export class TransactionsApiService extends BaseApiService {
  baseUrl = 'user/transactions'

  constructor({ app }) {
    super({ app, checkAuth })
  }

  setUrlParams(url, params) {
    const newUrl = new URL(url)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        newUrl.searchParams.set(key, value)
      })

      return newUrl
    }
  }

  async getWithdraws(params) {
    const rawUrl =
      import.meta.env.VITE_API_URL +
      '/' +
      this.baseUrl +
      '/withdraw_requests?filter=pending'
    const newUrl = this.setUrlParams(rawUrl, params)

    const data = await this.httpCall({
      method: 'get',
      url: newUrl.href
    })

    return data
  }

  async getAll(params) {
    const rawUrl = import.meta.env.VITE_API_URL + '/' + this.baseUrl + '/list'
    const newUrl = this.setUrlParams(rawUrl, params)

    const data = await this.httpCall({
      method: 'get',
      url: newUrl.href
    })

    return data
  }

  async p2pStart({ username, value }) {
    const data = await this.httpCall(
      {
        method: 'post',
        url: 'user/payment/p2p_start',
        data: { username, value }
      },
      { errorNotice: false }
    )

    return data
  }

  async p2pConfirm({ username, value }) {
    const { data } = await this.httpCall(
      {
        method: 'post',
        url: 'user/payment/p2p_confirm',
        data: { username, value }
      },
      { errorNotice: false }
    )

    return data
  }

  async withdrawalGrand({ amount }) {
    const { data } = await this.httpCall({
      method: 'post',
      url: 'v2/api/withdrawal',
      data: { amount }
    })
    return data
  }

  async cancelWithdrawalGrand({ transaction_id }) {
    const { data } = await this.httpCall({
      method: 'post',
      url: 'v2/api/withdrawal/cancel',
      data: { transaction_id }
    })
    return data
  }
}
