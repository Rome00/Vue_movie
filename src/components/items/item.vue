<template>
  <div class="column is-11 is-center is-mb-5">
    <div class="columns is-mobile is-multiline is-pt-4">
      <div
        class="column is-one-quarter-desktop is-full-mobile is-full-tablet is-offset-2-desktop bg-box m-t-lg"
      >
        <!-- Movie Image section -->
        <div class="poster-box">
          <figure class="image is-2by3">
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
        <!-- Movie Image section -->
      </div>
      <div
        class="column is-one-third-fullhd is-half-desktop is-full-mobile is-full-tablet is-offset-1-desktop bg-box"
      >
        <div class="columns is-multiline is-mobile">
          <!-- Title section -->
          <div class="column is-full">
            <transition
              enter-active-class="animated fadeIn"
              leave-active-class="aniamted fadeOut"
              :duration="300"
              mode="out-in"
            >
              <h1 :key="detail.title" class="title">{{ detail.title }}</h1>
            </transition>
          </div>
          <!-- Title section -->

          <!-- Discription section -->
          <div class="column is-full">
            <transition
              enter-active-class="animated fadeIn"
              leave-active-class="aniamted fadeOut"
              :duration="300"
              mode="out-in"
            >
              <p :key="detail.overview" class="has-text-white">
                {{ detail.overview }}
              </p>
            </transition>
          </div>
          <!-- Discription section -->

          <!-- METASCORE section -->
          <div class="column is-two-fifths-tablet is-full-mobile">
            <div class="is-100 is-flex is-start">
              <!-- Score Circle component -->
              <Progress :rate="detail.vote_average" />
              <!-- Score Circle component -->
              <div class="is-score is-pl-2">
                <p class="is-mb-small125"><strong>METASCORE</strong></p>
                <div class="is-flex is-around">
                  <p>from</p>
                  <figure class="image is-60x30">
                    <img src="../../assets/Img/imdb.png" alt="imdb" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <!-- METASCORE section -->

          <!-- Popularity section -->
          <div
            class="column is-two-fifths-tablet is-full-mobile is-offset-1-tablet"
          >
            <div class="is-100 is-flex is-start is-vcenter is-popular_wrapper">
              <figure class="image is-50x50">
                <img src="../../assets/Img/popular.png" alt="popularity" />
              </figure>
              <p class="has-text-white is-popular is-pl-3 is-size-4">
                {{ detail.popularity }}
              </p>
            </div>
          </div>
          <!-- Popularity section -->

          <!-- Budget -
                Runtime -
                  Ganre -
          -->
          <div class="column is-full is-mt-2">
            <div class="columns is-multiline is-mobile is-flex is-100">
              <!-- Budget & Revenue section -->
              <div class="column is-full-mobile is-half-tablet">
                <div
                  class="box is-flex is-vflex is-center is-100 has-background-green is-relative"
                >
                  <div class="is-boxoffice-bg is-absolute"></div>
                  <div
                    class="is-flex is-vflex-mobile is-between p-b-md is-relative is-boxoffice-box"
                  >
                    <div class="is-box_title">budget:</div>
                    <div class="is-box_val">{{ budget }}</div>
                  </div>
                  <div class="is-flex is-between is-relative is-boxoffice-box">
                    <div class="is-box_title">revenue:</div>
                    <div class="is-box_val">{{ revenue }}</div>
                  </div>
                </div>
              </div>
              <!-- Budget & Revenue section -->

              <!-- Runtime section -->
              <div class="column is-full-mobile">
                <div
                  class="box is-flex is-vflex is-center has-background-orange is-relative is-100"
                >
                  <div class="is-runtime-bg is-absolute"></div>
                  <div class="p-b-md is-box_title is-relative is-runtime-box">
                    runtime
                  </div>
                  <div class="is-box_val is-relative is-runtime-box">
                    {{ duration }}
                  </div>
                </div>
              </div>
              <!-- Runtime section -->

              <!-- Ganre section -->
              <div class="column is-full is-ganre">
                <div
                  class="box is-flex is-vflex is-center has-background-lightGray is-relative is-100"
                >
                  <div class="is-ganre-bg is-absolute"></div>
                  <div class="is-box_title is-relative">ganre</div>
                  <div class="column is-full is-pb-0">
                    <div
                      class="columns is-2 is-flex is-variable is-relative is-ganre-box"
                    >
                      <div
                        v-for="item in detail.genres"
                        :key="item.id"
                        class="column"
                      >
                        <div
                          class="w-100 has-background-primary is-box_val is-ganre_box-border has-text-centered"
                        >
                          {{ item.name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Ganre section -->
            </div>
          </div>
          <!-- Budget -
                Runtime-
                  Ganre 
          -->
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
    ...mapGetters(["routerId", "imgGet"]),
    budget() {
      const budget = parseInt(this.detail.budget);
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(budget);
    },
    revenue() {
      const revenue = parseInt(this.detail.revenue);
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(revenue);
    },
    duration() {
      const hour = Math.floor(this.detail.runtime / 60);
      const minute = this.detail.runtime % 60;
      return `${hour} H ${minute} m`;
    }
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
.title {
  color: #ffffff;
  font-size: 2rem;
  font-weight: 600;
  margin-top: 2rem;
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
    margin-top: 0;
  }
}
.poster-box {
  width: 100%;
}
.is {
  &-score {
    color: azure;
    max-height: 70px;
    p {
      font-size: 16px;
      strong {
        font-size: 18px;
        color: white;
      }
    }
  }
  &-popular {
    font-size: 24px;
    &_wrapper {
      max-height: 70px;
    }
  }
  &-box {
    &_title {
      color: wheat;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 500;
    }
    &_val {
      color: white;
      font-size: 16px;
      padding: 0 0.5rem 0 0.5rem;
      white-space: nowrap;
      @media screen and (max-width: 1100px) {
        font-size: 14px;
      }

      @media screen and (min-width: 1408px) {
        padding: 0 10px 0 10px;
      }
    }
  }
  &-boxoffice {
    &-bg {
      background: url("../../assets/Img/box-office.png");
      background-position: center right !important;
      background-repeat: no-repeat !important;
      background-size: contain !important;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 1;
    }
    &-box {
      z-index: 5555;
      &:nth-child(3) {
        @media screen and(max-width: 768px) {
          margin-top: 0.5rem;
        }
      }
    }
  }
  &-runtime {
    &-bg {
      background: url("../../assets/Img/runtime.png");
      background-position: center right !important;
      background-repeat: no-repeat !important;
      background-size: contain !important;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 1;
    }
    &-box {
      z-index: 5555;
    }
  }
  &-ganre {
    &-bg {
      background: url("../../assets/Img/ganre.png");
      background-position: center right !important;
      background-repeat: no-repeat !important;
      background-size: contain !important;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 1;
    }
    &_box {
      z-index: 55555;
      &-border {
        border-radius: 6px;
        box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
          0 0px 0 1px rgba(10, 10, 10, 0.02);
      }
    }
  }
}
</style>
