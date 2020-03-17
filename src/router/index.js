import Vue from "vue";
import VueRouter from "vue-router";
import topRated from "@/components/sections/topRated.vue";
import upComming from "@/components/sections/upComming.vue";
import discover from "@/components/sections/discover.vue";
import item from "@/components/items/item.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/"
  },
  {
    path: "/top-rated",
    component: topRated,
    props: {
      apiLink: "https://api.themoviedb.org/3/movie/top_rated?api_key="
    },
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
  },
  {
    path: "/somming-soon",
    component: upComming,
    props: {
      apiLink: "https://api.themoviedb.org/3/movie/upcoming?api_key="
    },
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
  },
  {
    path: "/discover",
    component: discover,
    props: {
      apiLink: "https://api.themoviedb.org/3/discover/movie?api_key="
    },
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
  },
  {
    path: "/item/:id/detail",
    name: "item",
    component: item,
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
