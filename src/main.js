import { createApp } from 'vue'

import { store } from './store/index'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n.plugin'

import toastPlugin from '@/plugins/toast.plugin.js'
import apiPlugin from '@/plugins/api.plugin.js'

import BreadCrumbs from '@/components/ui-elements/BreadCrumbs.vue'
import VueFeather from 'vue-feather'

import registerPrimeVueComponents from '@/plugins/primevue-components'
import registerGlobalComponents from '@/plugins/global-components'

import tooltipDirective from '@/directives/tooltip.directive.js'

// Import Theme scss
import '@/assets/scss/app.scss'

const app = createApp(App)

app.use(tooltipDirective)

app.use(registerPrimeVueComponents)
app.use(registerGlobalComponents)
app.component('BreadCrumbs', BreadCrumbs)
app.component(VueFeather.name, VueFeather)

app.use(i18n)
app.use(store)
app.use(router)
app.use(toastPlugin)
app.use(apiPlugin)

app.mount('#app')
