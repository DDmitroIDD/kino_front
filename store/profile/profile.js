import axios from "axios";

export const state = () => ({
  tickets: [],
  total: [],
  next: [],
  previous: [],
  current_page: 0,
  count: 0,
})

export const mutations = {
  SET_TICKETS (state, tickets) {
    state.tickets = tickets
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
  SET_COUNT (state, count) {
    state.count = count
  }
}


export const actions = {
  async loadAllTickets({commit}, {query_page}) {
    let page = query_page !== undefined ? `?page=${query_page}` : '';
    const {data} = await this.$axios.get(`/orders/${page}`);
    let next = data.next != null ? data.next.split('/')[5] : data.next;
    let previous = data.previous != null ? data.previous.split('/')[5] : data.previous;
    let current_page = query_page;


    commit('SET_TICKETS', data.results)
    commit('SET_COUNT', data.count)
    commit('SET_TOTAL', Math.ceil(data.count / 8))
    commit('SET_NEXT', next)
    commit('SET_PREVIOUS', previous)
    commit('SET_CURRENT_PAGE', Number(current_page))

  }
}
