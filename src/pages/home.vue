<script>
import FormBox from "../components/FormBox.vue";
import LineChartView from "../components/ChartView.vue";
import HorizontalChartView from "../components/HorizontalChartView.vue";
import ShowResult from "@/components/ShowResult.vue";
export default {
  name: "HomePage",
  components: { FormBox, LineChartView, HorizontalChartView, ShowResult },
  data() {
    return {
      data: {
        bmi: null,
        gender: null,
        month: null,
      },
      table: [],
    };
  },
  computed: {
    year() {
      return Math.floor((this.data.month + 1) / 12);
    },
    month() {
      return this.data.month - this.year * 12;
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
        <v-col cols="12" lg="8" class="mb-5" v-show="data.bmi != null">
          <LineChartView :data="data" :setTable="(e) => (table = e)" />

          <ShowResult
            :age="{ year, month }"
            :month="data.month"
            :bmi="data.bmi"
            :table="table"
          />

          <HorizontalChartView :data="data" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
