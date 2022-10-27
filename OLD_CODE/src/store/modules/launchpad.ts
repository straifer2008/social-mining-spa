import { store } from '@/store/index.ts'

export default {
  state: () => ({
    phaseInfo: null
  }),

  // mutations
  mutations: {
    SET_PHASE_INFO(state, payload) {
      state.phaseInfo = payload
    }
  },

  // actions
  actions: {
    async GET_PHASE_INFO({ commit }) {
      try {
        const data = await store.$api.launchpad.getPhaseInfo()
        commit('SET_PHASE_INFO', data)
        return data
      } catch (err) {
        err
        throw err
      }
    }
  },

  // getters
  getters: {
    PHASE_INFO: ({ phaseInfo }) => phaseInfo
  }
}
