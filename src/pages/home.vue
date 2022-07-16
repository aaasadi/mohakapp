<script>
import FormBox from "../components/FormBox.vue";
import LineChartView from "../components/ChartView.vue";
import HorizontalChartView from "../components/HorizontalChartView.vue";
export default {
  name: "HomePage",
  components: { FormBox, LineChartView, HorizontalChartView },
  data() {
    return {
      data: {
        bmi: null,
        gender: null,
        month: null,
      },
    };
  },
  computed: {
    age() {
      return Math.floor((this.data.month + 1) / 12);
    },
    month() {
      return this.data.month - this.age * 12;
    },
  },
};
</script>

<template>
  <v-container>
    <v-sheet color="white" class="card mt-5">
      <v-row justify="center">
        <v-col cols="12" lg="4">
          <FormBox :setData="(e) => (data = e)" />
        </v-col>
        <v-col cols="12" lg="8" v-show="data.bmi != null">
          <LineChartView :data="data" />

          <p class="mt-5" v-if="data.month > 0">
            فرزند شما دارای سن
            <span v-if="age > 0">{{ age }} سال</span>
            <span v-if="age > 0 && month > 0"> و</span>
            <span v-if="month > 0">{{ month }} ماه</span>
            می باشد و BMI ایشان
            {{ data.bmi }} است
          </p>

          <HorizontalChartView :data="data" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
