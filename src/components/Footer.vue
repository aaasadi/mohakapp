<script>
export default {
  name: "FooterApp",
};
</script>

<template>
  <v-footer class="footer">
    <v-row no-gutters class="px-5" justify="space-between">
      <div class="text">
        کلیه حقوق قانونی وب سایت متعلق به دانشگاه علوم پزشکی کرمان می باشد.
      </div>
      <div>
        <span class="text">{{
          new Date().toLocaleDateString("fa-IR", { year: "numeric" })
        }}</span>
        <v-icon left small>mdi-copyright</v-icon>
      </div>
    </v-row>
  </v-footer>
</template>

<style>
.footer {
  margin-top: 2rem;
  background-color: #eceff1;
}
.text {
  font-size: 0.9em;
}
</style>
