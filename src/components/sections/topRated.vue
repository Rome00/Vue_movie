<template>
  <div class="column is-10">
    <div class="columns is-centered is-multiline is-mobile is-variable is-8">
      <itemList v-for="item in movieData" :key="item.id" :data="item" />
    </div>
  </div>
</template>

<script>
import itemList from "@/components/items/listItems.vue";

export default {
  components: {
    itemList
  },
  props: {
    apiLink: {
      type: String,
      required: true
    }
  },
  computed: {
    movieData() {
      return this.$store.getters.onLoadMovies;
    }
  },
  created() {
    this.$store.state.detail = true;
    this.loadMovie();
  },
  methods: {
    loadMovie() {
      const apiLink = this.apiLink + this.$store.state.apikey;
      this.axios
        .get(apiLink)
        .then(Response => {
          this.$store.state.data = [];
          Response.data.results.forEach(item =>
            this.$store.dispatch("loadData", item)
          );
        })
        .catch(error => {
          throw error;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
