const TestScheduler = {
  state: {
    list: 0
  },
  mutations: {
    plush: (state) => {
      state.list++
      console.log(state.list)
    }
  },
  actions: {
    Add({ commit }) {
      commit('plush')
    }
  }
}

export default TestScheduler
