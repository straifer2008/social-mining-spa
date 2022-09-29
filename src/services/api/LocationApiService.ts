import { BaseApiService } from './core/BaseApiService'

export class LocationApiService extends BaseApiService {
  constructor({ app }) {
    super({ app })
  }

  async getCountries() {
    const { data } = await this.httpCall({
      method: 'get',
      url: 'location/countries'
    })

    return data
  }
}
