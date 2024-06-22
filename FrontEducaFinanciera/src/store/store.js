import { createStore } from 'vuex';
import { getToken, setToken, removeToken } from '@/auth';

export default createStore({
  state: {
    token: getToken(),
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
    removeToken(state) {
      state.token = null;
      removeToken();
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
  actions: {
    login({ commit }, token) {
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('removeToken');
    }
  }
});