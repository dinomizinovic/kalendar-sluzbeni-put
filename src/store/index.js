import Vue from "vue";
import Vuex from "vuex";
import { dialogStore } from "./dialogStore";
import { eventStore } from "./eventStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...dialogStore.state,
    ...eventStore.state,
    events: [],
  },
  mutations: {
    ...dialogStore.mutations,
    ...eventStore.mutations,
  },
  getters: {
    dateNow: () => {
      const date = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}.${month}.${year}T${hours}:${minutes}`;
    },
  },
});
