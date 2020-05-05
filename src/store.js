import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    city_info: {
      title: "",
      time: null,
      weather_state_name: "",
      the_temp: 0,
      max_temp: 0,
      min_temp: 0,
      humidity: 0,
      wind_speed: 0
    },
    openSnackbar: false
  },
  mutations: {
    SET_CITY_INFO(state, val) {
      const {
        title,
        time,
        weather_state_name,
        the_temp,
        max_temp,
        min_temp,
        humidity,
        wind_speed
      } = val;
      state.city_info = {
        title,
        time,
        weather_state_name,
        the_temp,
        max_temp,
        min_temp,
        humidity,
        wind_speed
      };
    },
    SET_OPEN_SNACKBAR(state, val) {
      state.openSnackbar = val;
    }
  },
  actions: {
    setCityInfo({ commit }, val) {
      commit("SET_CITY_INFO", val);
    },
    setOpenSnackbar({ commit }, val) {
      commit("SET_OPEN_SNACKBAR", val);
    }
  },
  getters: {
    city_info: state => state.city_info,
    openSnackbar: state => state.openSnackbar
  }
});
