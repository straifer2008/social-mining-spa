import { createStore, createLogger } from 'vuex'
import layout from './modules/layout'
import menu from './modules/menu'

import auth from './modules/auth'
import user from './modules/user'
import dashboard from './modules/dashboard'
import transactions from './modules/transactions'
import shared from './modules/shared'
import launchpad from './modules/launchpad'
import blogs from './modules/blogs'

export const store = createStore({
  modules: {
    layout,
    menu,
    user,
    auth,
    dashboard,
    transactions,
    shared,
    launchpad,
    blogs,
  },
  plugins: []
})
