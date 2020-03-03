import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    searchData: [],
    loaded: false,
    detail: true,
    detailBg: {},
    routerID: {},
    imgHead: "https://image.tmdb.org/t/p/original",
    apikey: "da4d11234eb9fbd69aa0dd7c6323eff9&language=en-US&page=1"
  },
  getters: {
    onLoadMovies: state => {
      return state.data;
    },
    searchedMovieData: state => {
      return state.searchData;
    },
    detailInfo: state => {
      return state.detail;
    },
    detailBg: state => {
      return state.detailBg;
    },
    routerId: state => {
      return state.routerID;
    }
  },
  mutations: {
    lodedData: (state, payload) => {
      state.data.push(payload);
    },
    searchedData: (state, payload) => {
      state.searchData.push(payload);
      state.loaded = true;
    },
    detailInfo: (state, payload) => {
      state.detailBg = { link: payload };
    },
    routerInfo: (state, payload) => {
      state.routerID = payload;
    }
  },
  actions: {
    loadData: ({ commit }, payload) => {
      commit("lodedData", payload);
    },
    searchData: ({ commit }, payload) => {
      commit("searchedData", payload);
    },
    detailMovie: ({ commit }, payload) => {
      commit("detailInfo", payload);
    },
    routerID: ({ commit }, payload) => {
      commit("routerInfo", payload);
    }
  }
});
