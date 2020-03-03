<template>
  <div class="column is-full m-b-xl">
    <div class="columns p-t-xl">
      <div class="column is-one-quarter is-offset-2 bg-box m-t-xl">
        <div class="poster-box">
          <figure class="image is-332x500">
            <transition
              enter-active-class="animated fadeIn"
              leave-active-class="aniamted fadeOut"
              :duration="300"
              mode="out-in"
            >
              <img
                :key="detail.title"
                :src="this.$store.state.imgHead + detail.poster_path"
                :alt="detail.title"
              />
            </transition>
          </figure>
        </div>
      </div>
      <div class="column is-two-fifths is-offset-1 bg-box m-t-xl">
        <div class="columns is-multiline">
          <div class="is-full">
            <transition
              enter-active-class="animated fadeIn"
              leave-active-class="aniamted fadeOut"
              :duration="300"
              mode="out-in"
            >
              <h1 :key="detail.title" class="title">{{ detail.title }}</h1>
            </transition>
          </div>
          <div class="is-full">
            <transition
              enter-active-class="animated fadeIn"
              leave-active-class="aniamted fadeOut"
              :duration="300"
              mode="out-in"
            >
              <p :key="detail.overview" class="has-text-white p-t-lg">
                {{ detail.overview }}
              </p>
            </transition>
          </div>
          <div class="is-one-fifth">
            <Progress :rate="detail.vote_average" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Progress from "@/components/bar/circleBar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Progress
  },
  data() {
    return {
      id: this.$route.params.id,
      detail: {}
    };
  },
  computed: {
    ...mapGetters(["routerId"])
  },
  watch: {
    "$route.params.id"() {
      this.id = this.$route.params.id;
      this.itemDetail();
    }
  },
  mounted() {
    this.itemDetail();
  },
  methods: {
    itemDetail() {
      this.detail = {};
      this.$store.state.detail = false;
      this.axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.id}?api_key=ad37adf30760fa22b0f9a4e01354dd8a`
        )
        .then(Response => {
          this.detail = Response.data;
          this.$store.dispatch("detailMovie", this.detail.backdrop_path);
        })
        .catch(error => {
          throw error;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.columns {
  width: 100%;
}
.poster-box {
  width: 100%;
}
</style>
