export const state = () => ({
  movies: [],
  total: [],
  next: [],
  previous: [],
  current_page: 0,
  tags: [],
  slug: ''
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
  SET_TAGS (state, tags) {
    state.tags = tags
  },
  SET_SLUG (state, slug) {
    state.slug = slug
  }
}


export const actions = {
  async loadAllTagMovies({commit}, {tag_param, query_page}) {
    let page = query_page !== undefined ? `?page=${query_page}` : '';

    let tag = tag_param !== undefined ? `${tag_param}` : '';
    const tags = await this.$axios.get(`/tags/`);
    const {data} = await this.$axios.get(`/tags/${tag}/${page}`);

    let slug = tag_param

    let next = data.next != null ? data.next.split('/').slice(-1)[0] : data.next;

    let previous = data.previous != null ? data.previous.split('/').slice(-1)[0] : data.previous;
    let current_page = 'query_page'


    commit('SET_MOVIES', data.results)
    commit('SET_TOTAL', Math.ceil(data.count / 8))
    commit('SET_NEXT', next)
    commit('SET_PREVIOUS', previous)
    commit('SET_CURRENT_PAGE', Number(current_page))
    commit('SET_TAGS', tags.data)
    commit('SET_SLUG', slug)

  }
}
