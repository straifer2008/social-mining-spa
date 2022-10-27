import { BaseApiService } from './core/BaseApiService'

export class LaunchpadApiService extends BaseApiService {
  baseUrl = 'launchpad/'

  constructor({ app }) {
    super({ app, checkAuth: true })
  }

  async getPhaseInfo() {
    const { data } = await this.httpCall({
      method: 'get',
      url: this.baseUrl + 'phase_info_data'
    })
    return data
  }
}
