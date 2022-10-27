import { $api } from '@/services/api/api.ts'
import { App } from 'vue'


export default {
  install(app: App) {
    app.config.globalProperties.$api = app.config.globalProperties.$store.$api =
      $api(app.config.globalProperties)
  }
}
