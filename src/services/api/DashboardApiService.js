import { BaseApiService } from './core/BaseApiService'

export class DashboardApiService extends BaseApiService {
  baseUrl = 'user/dashboard'

  constructor({ app }) {
    super({ app, checkAuth: true })
  }

  async getData() {
    const { data } = await this.httpCall({
      method: 'get',
      url: this.baseUrl
    })

    return data
  }

  async getPlatformStatuses() {
    const { data } = await this.httpCall({
      method: 'get',
      url: this.baseUrl + '/platform_statuses'
    })

    return data
  }
}
