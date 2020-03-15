<template>
  <div
    class="column is-one-quarter-widescreen is-one-third-tablet is-full-mobile is-mt-4"
  >
    <router-link
      tag="div"
      class="card hvr-grow"
      :to="{ name: 'item', params: { id: data.id } }"
    >
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="imgLink" :alt="data.title" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left"></div>
          <div class="media-content">
            <p class="title is-4 is-color-black">
              {{ data.title | shortenText(30) }}
            </p>
          </div>
        </div>

        <div class="content">
          {{ data.overview | shortenText(300) }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgLink() {
      if (!this.data.backdrop_path) {
        return "https://www.wallpaperflare.com/static/912/830/347/minimalism-black-dark-404-not-found-wallpaper.jpg";
      }
      return "https://image.tmdb.org/t/p/w500" + this.data.backdrop_path;
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  color: black;
}
.card {
  cursor: pointer;
}
.content {
  font-size: 16px;
}
@media only screen and (max-width: 1024px) {
  .content {
    font-size: 12px;
  }
}
.hvr-grow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}
.hvr-grow:hover,
.hvr-grow:focus,
.hvr-grow:active {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
