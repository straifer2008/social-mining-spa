import { BaseApiService } from './core/BaseApiService'
import { defaultProfileConfig } from '@/services/api/configs/profile.ts'

const checkAuth = true

export class UserApiService extends BaseApiService {
  constructor({ app }) {
    super({ app, checkAuth })
  }

  async getProfile(config = defaultProfileConfig) {
    const { data } = await this.httpCall({
      method: 'get',
      url: `user/profile?config=${JSON.stringify(config)}`
    })

    return data
  }

  async getWalletAddressByType(type) {
    const { data } = await this.httpCall({
      method: 'get',
      url: `v2/api/user/profile/wallet?type=${type}`
    })

    return data
  }

  async setWalletAddressByType({ type, address }) {
    const { data } = await this.httpCall({
      method: 'post',
      url: `v2/api/user/profile/wallet`,
      data: { type, address }
    })

    return data
  }

  async checkAddressActivity(type) {
    const { data } = await this.httpCall({
      method: 'get',
      url: `v2/api/user/profile/wallet/check_pending?type=${type}`
    })

    return data
  }

  async setLanguage({ language, taskLanguage = language }) {
    const { data } = await this.httpCall({
      method: 'post',
      url: `user/profile/languages`,
      data: { language, taskLanguage }
    })

    return data
  }
}
