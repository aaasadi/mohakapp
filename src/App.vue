<template>
  <v-app class="app">
    <Appbar />

    <v-main class="layout">
      <HomePage />
    </v-main>
  </v-app>
</template>

<script>
import "./assets/fonts/iransans/css/fontiran.css";
import HomePage from "./pages/home.vue";
import Appbar from "./components/Appbar.vue";

export default {
  name: "App",

  components: {
    HomePage,
    Appbar,
  },

  data: () => ({
    //
  }),
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
