import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-green/theme.css' //theme
import 'primevue/resources/primevue.min.css' //core css
import 'primeicons/primeicons.css' //icons
import ConfirmationService from 'primevue/confirmationservice';

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ConfirmPopup from 'primevue/confirmpopup'
import Message from 'primevue/message'
import { App } from 'vue'

export default {
  async install(app: App) {
    app.use(PrimeVue, { ripple: true })

    app.use(ConfirmationService)

    // eslint-disable-next-line vue/multi-word-component-names
    app.component('BButton', Button)
    app.component('GToast', Toast)
    app.component('GDialog', Dialog)
    app.component('GDataTable', DataTable)
    app.component('GColumn', Column)
    app.component('ConfirmPopup', ConfirmPopup)
    app.component('GMessage', Message)
  }
}
