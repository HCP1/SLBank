const state = {
  test: 0, //样例，后面删了它
  time:30,
}

const mutations = {
  INCREMENT_MAIN_COUNTER (state,pay) { //样例，后面删了它
    state.test++
  },
  RESER_TIMER(state){
    console.log(11111)
    state.time = 30
  }
}

const actions = {
  someAsyncTask ({ commit }) { //样例，后面删了它
    commit('INCREMENT_MAIN_COUNTER')
  },
}

export default {
  state,
  mutations,
  actions
}
