import { BaseApiService } from './core/BaseApiService'

export class ReferralApiService extends BaseApiService {
  constructor({ app }) {
    super({ app, checkAuth: true })
  }

  async getReferrerByCode(code) {
    return await this.httpCall({ method: 'get', url: `links/${code}` })
  }

  async getAffiliateData() {
    return await this.httpCall({
      method: 'get',
      url: `user/launchpad/affiliate_data`
    })
  }

  async getReferralLink() {
    return await this.httpCall({
      method: 'get',
      url: `user/launchpad/referral_link`
    })
  }

  async getNewReferralLink() {
    return await this.httpCall({
      method: 'post',
      url: `user/launchpad/referral_link`
    })
  }
}
