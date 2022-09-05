import { $api } from '@/services/api/api.js'

export default {
  install(app) {
    app.config.globalProperties.$api = app.config.globalProperties.$store.$api =
      $api(app.config.globalProperties)
  }
}
