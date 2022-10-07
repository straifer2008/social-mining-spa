import { createApp } from 'vue'

import { store } from './store/index'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n.plugin'
import http from './utils/http'
import auth from './plugins/auth'
import firebase from './plugins/firebase'

import toastPlugin from '@/plugins/toast.plugin.ts'
import apiPlugin from '@/plugins/api.plugin.ts'

import BreadCrumbs from '@/components/ui-elements/BreadCrumbs.vue'
import VueFeather from 'vue-feather'

import registerPrimeVueComponents from '@/plugins/primevue-components'
import registerGlobalComponents from '@/plugins/global-components'

import tooltipDirective from '@/directives/tooltip.directive.ts'

// Import Theme scss
import '@/assets/scss/app.scss'

const app = createApp(App)

app.use(tooltipDirective)

app.use(registerPrimeVueComponents)
app.use(registerGlobalComponents)
app.component('BreadCrumbs', BreadCrumbs)
app.component(VueFeather.name, VueFeather)

app.use(http)
app.use(i18n)
app.use(store)
app.use(router)
app.use(auth)
app.use(toastPlugin)
app.use(apiPlugin)
app.use(firebase)

app.mount('#app')
