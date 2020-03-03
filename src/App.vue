<template>
  <div>
    <Nav />
    <Home />
    <Footer />
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import Home from "@/components/Home.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Nav,
    Home,
    Footer
  }
};
</script>

<style lang="scss" scoped></style>
