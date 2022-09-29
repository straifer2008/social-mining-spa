import { BaseApiService } from './core/BaseApiService'

const checkAuth = true

export class AuthApiService extends BaseApiService {
  constructor({ app }) {
    super({ app, checkAuth })
  }

  async register(data = {}) {
    return await this.httpCall({ method: 'post', url: 'auth/signup', data })
  }

  async login(data = {}) {
    return await this.httpCall({ method: 'post', url: 'auth/login', data })
  }

  async logout(data = {}) {
    return await this.httpCall({ method: 'post', url: 'auth/logout', data })
  }

  async reset(data = {}) {
    return await this.httpCall({ method: 'post', url: 'auth/reset', data })
  }

  async getAuthEmailCode(token) {
    return await this.httpCall({ method: 'get', url: `challenge/${token}` })
  }

  async repeatAuthEmailCode(token) {
    return await this.httpCall({
      method: 'post',
      url: `challenge/${token}/repeat`
    })
  }

  async checkCodeAndAuthenticate(token, data) {
    return await this.httpCall({
      method: 'post',
      url: `challenge/${token}`,
      data
    })
  }
}
