import axios from 'axios'
import { handleErrors } from '@/services/api/core/handleErrors.ts'

export class BaseApiService {
  baseUrl
  http
  $notice
  checkAuth

  constructor({app, baseUrl = import.meta.env.VITE_API_URL, checkAuth = false}) {
    this.baseUrl = baseUrl
    this.$notice = app.$notice
    this.checkAuth = checkAuth

    this.http = axios.create({
      baseURL: baseUrl,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    })
  }

  async httpCall(config, { errorNotice = true } = {}) {
    if (this.checkAuth) {
      this.http.defaults.headers.common.Authorization =
      localStorage.getItem('grand_auth_token')
    }
    try {
      const { data } = await this.http.request(config)
      return data
    } catch (error) {
      const errorMessage = handleErrors(error?.response)
      if (errorNotice && errorMessage) {
        this.$notice({type: 'error', detail: errorMessage, life: 10000})
      }
      throw {errorMessage, data: error.response.data}
    }
  }
}
