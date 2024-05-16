import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    userID: null,
  }),
  getters: {
    getToken(state) {
      return state.token
    },
    getID(state) {
      return state.userID
    }
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setID(userID) {
      this.userID = userID;
    },
  },
});