<template>
  <v-app class="app">
    <Appbar />

    <v-main class="layout">
      <HomePage />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import "./assets/fonts/iransans/css/fontiran.css";
import HomePage from "./pages/home.vue";
import Appbar from "./components/Appbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  title: "test",
  head: {
    title: "test",
  },
  components: {
    HomePage,
    Appbar,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  align-items: center;
}
.app {
  font-family: "IRANSans";
}
</style>
