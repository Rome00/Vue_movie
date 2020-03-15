<template>
  <b-navbar type="is-black" fixed-top="true">
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
@media only screen and (max-width: 1023px) {
  .navbar-menu {
    height: 100vh;
    width: 50%;
    position: fixed;
    background: black !important;
    right: 0;
    clip-path: circle(10px at 95% -15%);
    transition: all 0.4s ease-in-out;
    display: block !important;
  }
  .navbar-menu.is-active {
    transition: all 0.4s ease-in-out;
    clip-path: circle(200vh at 95% -15%);
  }
}
@media only screen and (max-width: 768px) {
  .navbar-menu {
    height: 100vh;
    width: 80%;
  }
}
</style>
