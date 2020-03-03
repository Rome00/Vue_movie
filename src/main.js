import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import buefy
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "@/assets/Scss/main.scss";

// import animation.css
import VAnimateCss from "v-animate-css";

//import axios
import axios from "axios";
import VueAxios from "vue-axios";

// import filters
import "@/plugins/filters.js";

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VAnimateCss);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
