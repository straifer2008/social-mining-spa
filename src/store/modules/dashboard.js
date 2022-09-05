import { store } from '@/store/index.js'

export default {
  state: () => ({
    dashboard: null,
    platformStatuses: []
  }),

  // mutations
  mutations: {
    SET_DASHBOARD_DATA(state, payload) {
      state.dashboard = payload
    },
    SET_PLATFORM_STATUSES(state, payload) {
      state.platformStatuses = payload
    }
  },

  // actions
  actions: {
    async GET_DASHBOARD_DATA({ commit }) {
      try {
        const data = await store.$api.dashboard.getData()
        commit('SET_DASHBOARD_DATA', data)
        return data
      } catch (err) {
        err
        throw err
      }
    },
    async GET_PLATFORM_STATUSES({ commit }) {
      try {
        const data = await store.$api.dashboard.getPlatformStatuses()
        commit('SET_PLATFORM_STATUSES', data)
        return data
      } catch (err) {
        err
        throw err
      }
    }
  },

  // getters
  getters: {
    DASHBOARD: ({ dashboard }) => dashboard,
    BALANCE_NORMALIZE: ({ dashboard }) => {
      if (dashboard?.balance?.grand) {
        const balanceNormalize = {}
        Object.entries(dashboard.balance).forEach(([key, value]) => {
          const redexResp = value.replace(/\s/g, '').match(/[a-z]/i)
          balanceNormalize[key] = {
            name: redexResp.input.substr(redexResp.index).toUpperCase(),
            value: +redexResp.input.substr(0, redexResp.index)
          }
        })
        return balanceNormalize
      }
      return {
        grand: { value: 0, name: 'GRAND' },
        usdc_grand: { value: 0, name: 'USDC' }
      }
    },
    PLATFORM_STATUSES: ({ platformStatuses }) => platformStatuses
  }
}
