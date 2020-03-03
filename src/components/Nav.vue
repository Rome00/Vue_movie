<template>
  <b-navbar type="is-black">
    <template slot="brand">
      <b-navbar-item class="has-text-primary" tag="router-link" to="/"
        >The movie Db</b-navbar-item
      >
    </template>
    <template slot="start">
      <b-navbar-item active-class="active" tag="router-link" to="/top-rated">
        Top Rated
      </b-navbar-item>
      <b-navbar-item active-class="active" tag="router-link" to="/somming-soon">
        Comming Soon
      </b-navbar-item>
      <b-navbar-item active-class="active" tag="router-link" to="/discover">
        Discover
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style lang="scss">
.navbar-brand a {
  font-family: "Anders", sans-serif;
  font-size: 24px;
}
.navbar-start {
  padding-left: 40px;
  .navbar-item,
  .navbar-link {
    font-family: "Dancing Script";
    font-size: 20px;
    padding: 0.5rem 2.5rem;
    &:hover {
      color: green !important;
    }
    outline: none;
  }
  .active {
    color: white !important;
    background: rgb(10, 78, 10) !important;
    &:hover {
      color: white !important;
    }
  }
}
</style>
