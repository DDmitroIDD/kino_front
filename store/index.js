import axios from "axios";

export const state = () => ({
  movies: [],
  total: [],
  next: [],
  previous: [],
  current_page: 0
})

export const mutations = {
  SET_MOVIES (state, movies) {
    state.movies = movies
  },
  SET_TOTAL (state, total) {
    state.total = total
  },
  SET_NEXT (state, next) {
    state.next = next
  },
  SET_PREVIOUS (state, previous) {
    state.previous = previous
  },
  SET_CURRENT_PAGE (state, current_page) {
    state.current_page = current_page
  },
}


export const actions = {
  async loadAllMovies({commit}, {query_page}) {
    let page = query_page !== undefined ? `?page=${query_page}` : '';
    const {data} = await this.$axios.get(`/movie/${page}`);
    let next = data.next != null ? data.next.split('/')[5] : data.next;
    let previous = data.previous != null ? data.previous.split('/')[5] : data.previous;
    let current_page = query_page


    commit('SET_MOVIES', data.results)
    commit('SET_TOTAL', Math.ceil(data.count / 6))
    commit('SET_NEXT', next)
    commit('SET_PREVIOUS', previous)
    commit('SET_CURRENT_PAGE', Number(current_page))

  }
}
