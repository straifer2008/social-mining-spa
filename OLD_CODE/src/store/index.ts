import { createStore, createLogger } from 'vuex'
import layout from './modules/layout'
import menu from './modules/menu'

import app from './modules/app'
import user from './modules/user'
import dashboard from './modules/dashboard'
import transactions from './modules/transactions'
import shared from './modules/shared'
import launchpad from './modules/launchpad'
import blogs from './modules/blogs'

export const store = createStore({
  namespaced: true,
  modules: {
    layout,
    menu,
    user,
    app,
    dashboard,
    transactions,
    shared,
    launchpad,
    blogs,
  },
  plugins: []
})
