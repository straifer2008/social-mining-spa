import { store } from '@/store/index.ts'

export default {
  state: () => ({
    user: null,
    userReferralLink: null
  }),

  // mutations
  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload
    },
    SET_GET_USER_REFERRAL_LINK: (state, payload) => {
      state.userReferralLink = payload
    }
  },

  // actions
  actions: {
    async GET_USER({ commit }) {
      try {
        const data = await store.$api.user.getProfile()
        commit('SET_USER', data)
        return data
      } catch (err) {
        err
        throw err
      }
    },

    async CHANGE_USER_LANGUAGE({ commit }, { language, code }) {
      try {
        const data = await store.$api.user.setLanguage({ language })
        sessionStorage.setItem('grand_lang', code)
        commit('CHANGE_SHARED_DATA', data)
        return data
      } catch (err) {
        err
        throw err
      }
    },

    async GET_USER_REFERRAL_LINK({ commit }) {
      try {
        const { data } = await store.$api.referral.getReferralLink()
        commit('SET_GET_USER_REFERRAL_LINK', data)
        return data
      } catch (err) {
        err
        throw err
      }
    },

    async GENERATE_USER_REFERRAL_LINK({ commit }) {
      try {
        const { data } = await store.$api.referral.getNewReferralLink()
        commit('SET_GET_USER_REFERRAL_LINK', data)
        return data
      } catch (err) {
        err
        throw err
      }
    }
  },

  // getters
  getters: {
    USER: ({ user }) => user,
    USER_REFERRAL_LINK: ({ userReferralLink }) => userReferralLink
  }
}
