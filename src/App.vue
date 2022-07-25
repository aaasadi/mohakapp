<template>
  <v-app class="app">
    <Appbar />

    <v-main class="layout">
      <HomePage />
    </v-main>

    <v-footer class="footer">
      <v-row no-gutters class="px-5" justify="space-between">
        <div class="text">تمامی حقوق برای دانشگاه علوم پزشکی محفوظ می‌باشد</div>
        <div>
          <span class="text">{{
            new Date().toLocaleDateString("fa-IR", { year: "numeric" })
          }}</span>
          <v-icon left small>mdi-copyright</v-icon>
        </div>
      </v-row>
    </v-footer>
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
.footer {
  margin-top: 2rem;
  background-color: #eceff1;
}
.text {
  font-size: 0.9em;
}
</style>
