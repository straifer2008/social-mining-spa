import Tooltip from 'primevue/tooltip'

export default {
  async install(app) {
    app.directive('tooltip', Tooltip)
  }
}
