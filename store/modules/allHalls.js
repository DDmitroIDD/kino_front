import axios from "axios";

export const state = () => ({
  halls: []
})

export const mutations = {
  SET_HALLS (state, hallName) {
    state.hallName = hallName
  },
}

export const actions = {
    async allHalls({commit}) {
    const {data} = await this.$axios.get('/cinema_halls/');

      commit('SET_HALLS', data.results)
    }


}
