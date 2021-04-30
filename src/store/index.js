import { createStore } from "vuex";
import FilterStore from "./filters/FilterStore.js";

export default createStore({
  modules: {
    filters: FilterStore
  },
  state: {
  },
  mutations: {},
  actions: {},
  getters: {}
});
