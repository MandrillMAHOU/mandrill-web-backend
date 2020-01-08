import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: '',
  },
  getters: {
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
    }
  },
  actions: {
    setUserInfo({ commit }, payload) {
      commit('setUserInfo', payload);
    }
  }
});
