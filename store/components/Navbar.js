import axios from "axios";

export const state = () => ({
  q : null,
  loggedIn : null,
  user : null,


})

export const mutations = {
  // SET_Q (state, q) {
  //   state.q = q
  // },
  SET_USER (state, user) {
    state.user = user
  },
  SET_LOGGEDIN (state, loggedIn) {
    state.loggedIn = loggedIn
  }
}


export const actions = {
  async userData({commit}) {
    let user = this.$auth.user
    let loggedIn = this.$auth.loggedIn

    commit('SET_USER', user)
    commit('SET_LOGGEDIN', loggedIn)

  },
  // async setQ({commit}) {
  //
  // }
}
