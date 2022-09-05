import { store } from '@/store/index.js'

export default {
  state: () => ({
    sharedData: null,
    visibilityTransferGrandDialog: false,
    visibilityWithdrawalGrandDialog: false,
    visibilityStakeGrandDialog: false,
    visibilitySetGrandWithdrawalWalletDialog: { show: false, addressType: '' }
  }),

  // mutations
  mutations: {
    SET_SHARED_DATA: (state, payload) => {
      state.sharedData = payload
    },
    CHANGE_SHARED_DATA: (state, payload) => {
      state.sharedData = { ...state.sharedData, ...payload }
    },
    REMOVE_USER_ALERT: (state, index) => {
      state.sharedData.alerts.splice(index, 1)
    },
    SET_VISIBILITY_TRANSFER_GRAND_DIALOG: (state, payload) => {
      state.visibilityTransferGrandDialog = payload
    },
    SET_VISIBILITY_WITHDRAWAL_GRAND_DIALOG: (state, payload) => {
      state.visibilityWithdrawalGrandDialog = payload
    },
    SET_VISIBILITY_SET_GRAND_WITHDRAWAL_WALLET_DIALOG: (state, payload) => {
      state.visibilitySetGrandWithdrawalWalletDialog = payload
    },
    SET_VISIBILITY_STAKE_GRAND_DIALOG: (state, payload) => {
      state.visibilityStakeGrandDialog = payload
    },
  },

  // actions
  actions: {
    async GET_SHARED_DATA({ commit }) {
      try {
        const data = await store.$api.shared.getSharedData()
        commit('SET_SHARED_DATA', data)
        return data
      } catch (err) {
        err
        throw err
      }
    },
    REMOVE_USER_ALERT({ commit }, index) {
      commit('REMOVE_USER_ALERT', index)
    },
    SET_VISIBILITY_TRANSFER_GRAND_DIALOG({ commit }, value) {
      commit('SET_VISIBILITY_TRANSFER_GRAND_DIALOG', value)
    },
    SET_VISIBILITY_WITHDRAWAL_GRAND_DIALOG({ commit }, value) {
      commit('SET_VISIBILITY_WITHDRAWAL_GRAND_DIALOG', value)
    },
    SET_VISIBILITY_SET_GRAND_WITHDRAWAL_WALLET_DIALOG({ commit }, payload) {
      commit('SET_VISIBILITY_SET_GRAND_WITHDRAWAL_WALLET_DIALOG', payload)
    },
    SET_VISIBILITY_STAKE_GRAND_DIALOG({ commit }, value) {
      commit('SET_VISIBILITY_STAKE_GRAND_DIALOG', value)
    },
  },

  // getters
  getters: {
    SHARED_DATA: ({ sharedData }) => sharedData,
    USER_LANGUAGE: ({ sharedData }) => {
      if (sharedData?.userLanguage) {
        sharedData.userLanguage.code = sharedData.userLanguage.code.substr(0, 2)
        return sharedData.userLanguage
      }
      return null
    },
    USER_ALERTS: ({ sharedData }) => sharedData?.alerts || [],
    VISIBILITY_TRANSFER_GRAND_DIALOG: ({ visibilityTransferGrandDialog }) => visibilityTransferGrandDialog,
    VISIBILITY_WITHDRAWAL_GRAND_DIALOG: ({ visibilityWithdrawalGrandDialog }) => visibilityWithdrawalGrandDialog,
    VISIBILITY_SET_GRAND_WITHDRAWAL_WALLET_DIALOG: ({visibilitySetGrandWithdrawalWalletDialog}) => visibilitySetGrandWithdrawalWalletDialog,
    VISIBILITY_STAKE_GRAND_DIALOG: ({visibilityStakeGrandDialog}) => visibilityStakeGrandDialog,
  }
}
