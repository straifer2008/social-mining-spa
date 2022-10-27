// import { store } from '@/store/index.ts'
import {ActionContext} from 'vuex'


type AppState = {
  device_hash ?: string
}

export default {
  namespaced: true,
  state: () => ({
    device_hash: null
  }),

  // mutations
  mutations: {
    updateDeviceHash(state: AppState,payload: any){
        state.device_hash = payload
    }
  },

  // actions
  actions: {
    updateDeviceHash(context: any,payload: any){
      context.commit('updateDeviceHash',payload)
    }
  },

  // getters
  getters: {}
}
