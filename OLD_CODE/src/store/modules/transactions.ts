import { store } from '@/store/index.ts'

import i18n from '@/plugins/i18n.plugin.ts'
const {
  global: { t: $t }
} = i18n

export default {
  state: () => ({
    withdraws: {},
    transactions: {}
  }),

  // mutations
  mutations: {
    SET_WITHDRAWS_LIST(state, payload) {
      state.withdraws = payload
    },
    ADD_WITHDRAWAL(state, withdraw) {
      state.withdraws.data.unshift(withdraw)
    },
    SET_TRANSACTIONS(state, payload) {
      state.transactions = payload
    },
    ADD_TRANSACTION(state, transaction) {
      state.transactions.data.unshift(transaction)
    }
  },

  // actions
  actions: {
    async GET_WITHDRAWS_LIST({ commit }, params) {
      try {
        const data = await store.$api.transactions.getWithdraws(params)
        commit('SET_WITHDRAWS_LIST', data)
        return data
      } catch (err) {
        err
        throw err
      }
    },
    async GET_TRANSACTIONS({ commit }, params) {
      try {
        const data = await store.$api.transactions.getAll(params)
        commit('SET_TRANSACTIONS', data)
        return data
      } catch (err) {
        err
        throw err
      }
    },
    async CONFIRM_2P2({ commit }, payload) {
      try {
        const data = await store.$api.transactions.p2pConfirm(payload)
        commit('ADD_TRANSACTION', data)
        return data
      } catch (err) {
        err
        throw err
      }
    },
    async WITHDRAWSL_GRAND({ commit }, payload) {
      try {
        const { balance, transaction } =
          await store.$api.transactions.withdrawalGrand(payload)
        commit('ADD_TRANSACTION', transaction)
        commit('ADD_WITHDRAWAL', transaction)
        commit('SET_DASHBOARD_DATA', { balance })

        store.$notice({
          detail: $t('withdrawalGrandDialog.successConfirmMessage'),
          life: 10000
        })
        return { balance, transaction }
      } catch (err) {
        err
        throw err
      }
    }
  },

  // getters
  getters: {
    WITHDRAWS_LIST: ({ withdraws }) => withdraws,
    TRANSACTIONS: ({ transactions }) => transactions
  }
}
