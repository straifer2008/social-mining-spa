import { BaseApiService } from './core/BaseApiService'

const checkAuth = true

export class SharedApiService extends BaseApiService {
  constructor({ app }) {
    super({ app, checkAuth })
  }

  async getSharedData() {
    const { data } = await this.httpCall({
      method: 'get',
      url: 'common/data'
    })

    return data
  }
}
