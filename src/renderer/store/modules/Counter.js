const state = {
  main: 0,
  time:30,
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state,pay) {
    state.main++
  },
  RESER_TIMER(state){
    state.time = 30
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    console.log(111)
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  setTimer({ commit }){
    console.log(111)
    commit('RESER_TIMER')
  }
}

export default {
  state,
  mutations,
  actions
}
