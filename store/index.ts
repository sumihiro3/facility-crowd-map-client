import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/types'

export const state = (): RootState => ({
  lineUserId: '',
  liff: null
})

export const mutations: MutationTree<RootState> = {
  setLineUserId(state: RootState, userId: string): void {
    state.lineUserId = userId
  },
  setLiff(state: RootState, liff: any): void {
    state.liff = liff
  }
}

export const actions: ActionTree<RootState, RootState> = {
  setLiff: ({ commit }, liff: any) => {
    commit('setLiff', liff)
  },
  setLineUserId: ({ commit }, userId: string) => {
    commit('setLineUserId', userId)
    // },
    // showInfoMessage: async ({ commit }, message: string) => {
    //   commit('setInfoMessage', message)
    //   commit('setErrorMessage', '')
  }
}
