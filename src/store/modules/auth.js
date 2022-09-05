// import { store } from '@/store/index.js'

export default {
  state: () => ({}),

  // mutations
  mutations: {},

  // actions
  actions: {
    async LOGOUT({ commit }) {
      try {
        // const data = await store.$api.auth.logout()
        commit('SET_USER', null)
        console.log('store LOGOUT')
        localStorage.removeItem('grand_auth_token')
        // return data
      } catch (err) {
        err
        throw err
      }
    }
  },

  // getters
  getters: {}
}
