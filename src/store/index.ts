import { createStore } from 'vuex'

export default createStore({
  state: {
    base_url:'http://localhost:3000/' as string,
    usernameForTitle:''
  },
  mutations: {
    SET_USERNAME(state,username){
      state.usernameForTitle = username;
    }
  },
  actions: {
  },
  modules: {
  }
})
