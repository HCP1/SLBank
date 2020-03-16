const state = {
  time:30,
  isClick:true,
}

const mutations = {
  RESER_TIMER(state){
    state.time = 30
  },
  CLICK_SCEREEN(state,play){
    state.isClick = play
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
