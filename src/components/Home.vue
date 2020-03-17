<template>
  <div :style="[darkBg ? { background: '#000' } : bgImage]">
    <div
      class="columns is-centered is-multiline is-mobile bg-transparent-dark is-min_full"
    >
      <div class="column is-4-desktop is-6-tablet is-10-mobile">
        <section class="is-mt-2 is-full">
          <b-field
            :class="[darkBg ? 'search_center' : 'search_top']"
            label="Find a Movie"
          >
            <b-autocomplete
              v-model="name"
              :data="dataInfo"
              placeholder="e.g. Fight Club"
              field="title"
              :loading="isFetching"
              @keyup.enter.native="getMovie"
              @click.native="getMovie"
              @typing="searchMovie"
              @blur="name = ''"
              @select="option => (selected = option)"
            >
              <template slot-scope="props">
                <div class="media">
                  <div class="media-left">
                    <img
                      width="32"
                      :src="
                        `https://image.tmdb.org/t/p/w500/${props.option.poster_path}`
                      "
                    />
                  </div>
                  <div class="media-content">
                    {{ props.option.title }}
                    <br />
                    <small>
                      Released at {{ props.option.release_date }}, rated
                      <b>{{ props.option.vote_average }}</b>
                    </small>
                  </div>
                </div>
              </template>
            </b-autocomplete>
          </b-field>
        </section>
      </div>
      <transition
        enter-active-class="animated slideInLeft"
        leave-active-class="animated slideOutRight"
        mode="out-in"
        :duration="850"
      >
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selected: null,
      isFetching: false,
      name: ""
    };
  },
  computed: {
    ...mapGetters(["detailInfo", "detailBg"]),
    dataInfo() {
      return this.$store.getters.searchedMovieData;
    },
    darkBg() {
      if (this.$route.fullPath === "/") {
        return true;
      } else {
        return false;
      }
    },
    bgImage() {
      const data = this.$store.getters.onLoadMovies;
      if (data.length >= 1 && this.detailInfo) {
        const randNumber = Math.floor(Math.random() * data.length);
        return {
          "background-image":
            "url(https://image.tmdb.org/t/p/original" +
            this.$store.getters.onLoadMovies[randNumber].poster_path +
            ")",
          "background-size": "cover",
          "background-position": "center",
          "background-repeat": "no-repeat"
        };
      } else {
        return {
          "background-image":
            "url(https://image.tmdb.org/t/p/original" +
            this.detailBg.link +
            ")",
          "background-size": "cover",
          "background-position": "center",
          "background-repeat": "no-repeat"
        };
      }
    }
  },
  methods: {
    searchMovie() {
      if (!this.name.length) {
        return;
      }
      this.isFetching = true;
      this.axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=da4d11234eb9fbd69aa0dd7c6323eff9&query=${this.name}`
        )
        .then(Response => {
          this.$store.state.searchData = [];
          Response.data.results.forEach(item =>
            this.$store.dispatch("searchData", item)
          );
        })
        .catch(error => {
          throw error;
        })
        .finally(() => {
          this.isFetching = false;
        });
    },
    getMovie() {
      if (this.name !== "") {
        this.$router.push({ name: "item", params: { id: this.selected.id } });
        this.$store.dispatch("routerID", this.selected.id);
        this.name = "";
      }
    }
  }
};
</script>

<style lang="scss">
.search {
  &_center {
    margin-top: 45%;
    transition: all 0.3s ease;
  }
  &_top {
    margin-top: 0;
    transition: all 0.3s ease;
  }
}
.label {
  text-align: center;
  color: white !important;
}
.bg-section {
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat;
  padding-bottom: 2rem;
}
.is-full {
  width: 100%;
}
.columns:not(:last-child) {
  margin-bottom: 0 !important;
}
.bg-transparent-dark {
  background: rgba($color: #000000, $alpha: 0.7);
}
.is-min_full {
  min-height: 100vh;
}
</style>
