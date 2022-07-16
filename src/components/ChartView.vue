<script>
import boyUnderTwoYear from "./../assets/tables/boy_under_two_year.json";
import boyBetweenTwoAndFiveYear from "./../assets/tables/boy_between_2_and_5_year.json";
import boyTopOfFiveYear from "./../assets/tables/boy_top_of_5_year.json";
import girlUnderTwoYear from "./../assets/tables/girl_under_two_year.json";
import girlBetweenTwoAndFiveYear from "./../assets/tables/girl_between_2_and_5_year.json";
import girlTopOfFiveYear from "./../assets/tables/girl_top_of_5_year.json";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "ChartView",
  components: {
    LineChartGenerator,
  },
  props: {
    data: {
      type: Object,
    },
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartOptions: {
        plugins: {
          legend: {
            display: false,
          },
        },
        borderWidth: 2,
        pointStyle: "cross",
        pointBorderWidth: 0.01,
        tension: 0.2,
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {
    title() {
      const { month } = this.data;
      let range;
      if (month < 24) range = "زیر دو سال";
      else if (month < 60) range = "دو تا پنج سال";
      else if (month < 228) range = "پنج تا نوزده سال";

      return `نمودار رشد فرزندان ${range}`;
    },
    colors() {
      return {
        black: "#636e72",
        red: "#ff7675",
        yellow: "#ffeaa7",
        green: "#00cec9",
        primary: "#6c5ce7",
      };
    },
    arrayOfMonth() {
      const { month } = this.data;
      const array = [];
      let start, year;
      if (month < 24) (start = 0), (year = 2);
      else if (month < 60) (start = 24), (year = 3);
      else (start = 60), (year = 14);
      for (let i = 0; i < year * 12; i++) {
        if ((i + start) % 12 == 0)
          array[i] = `${Math.floor((i + start) / 12)} سال`;
        else array[i] = (i + start) % 12;
      }
      return array;
    },
    BMICalculator() {
      const array = [];
      const { month, bmi } = this.data;
      let year, start;
      if (month < 24) (year = 2), (start = 0);
      else if (month < 60) (year = 3), (start = 24);
      else (year = 14), (start = 60);
      for (let i = 0; i < year * 12; i++) {
        if (i == month - start) {
          array[i] = bmi;
        } else {
          array[i] = null;
        }
      }
      return array;
    },
    manageDatasets() {
      let datasets = [];
      const { gender, month } = this.data;
      switch (gender) {
        case "boy":
          if (month < 24) {
            datasets = this.setDatasets(boyUnderTwoYear, [
              { id: 3, color: this.colors.black },
              { id: 4, color: this.colors.red },
              { id: 5, color: this.colors.yellow },
              { id: 6, color: this.colors.green },
              { id: 7, color: this.colors.yellow },
              { id: 8, color: this.colors.red },
              { id: 9, color: this.colors.black },
            ]);
          } else if (month < 60) {
            datasets = this.setDatasets(boyBetweenTwoAndFiveYear, [
              { id: 3, color: this.colors.black },
              { id: 4, color: this.colors.red },
              { id: 5, color: this.colors.yellow },
              { id: 6, color: this.colors.green },
              { id: 7, color: this.colors.yellow },
              { id: 8, color: this.colors.red },
              { id: 9, color: this.colors.black },
            ]);
          } else if (month < 229) {
            datasets = this.setDatasets(boyTopOfFiveYear, [
              { id: 4, color: this.colors.black },
              { id: 5, color: this.colors.red },
              { id: 6, color: this.colors.yellow },
              { id: 7, color: this.colors.green },
              { id: 8, color: this.colors.yellow },
              { id: 9, color: this.colors.red },
              { id: 10, color: this.colors.black },
            ]);
          }
          break;
        case "girl":
          if (month < 24) {
            datasets = this.setDatasets(girlUnderTwoYear, [
              { id: 3, color: this.colors.black },
              { id: 4, color: this.colors.red },
              { id: 5, color: this.colors.yellow },
              { id: 6, color: this.colors.green },
              { id: 7, color: this.colors.yellow },
              { id: 8, color: this.colors.red },
              { id: 9, color: this.colors.black },
            ]);
          } else if (month < 60) {
            datasets = this.setDatasets(girlBetweenTwoAndFiveYear, [
              { id: 3, color: this.colors.black },
              { id: 4, color: this.colors.red },
              { id: 5, color: this.colors.yellow },
              { id: 6, color: this.colors.green },
              { id: 7, color: this.colors.yellow },
              { id: 8, color: this.colors.red },
              { id: 9, color: this.colors.black },
            ]);
          } else if (month < 229) {
            datasets = this.setDatasets(girlTopOfFiveYear, [
              { id: 4, color: this.colors.black },
              { id: 5, color: this.colors.red },
              { id: 6, color: this.colors.yellow },
              { id: 7, color: this.colors.green },
              { id: 8, color: this.colors.yellow },
              { id: 9, color: this.colors.red },
              { id: 10, color: this.colors.black },
            ]);
          }
      }
      return datasets;
    },
    chartData() {
      return {
        labels: this.arrayOfMonth,
        datasets: [
          {
            label: "BMI",
            borderColor: "#3498db",
            backgroundColor: "#3498db",
            pointStyle: "circle",
            pointBorderWidth: 5,
            pointHoverBorderWidth: 15,
            fill: true,
            data: this.BMICalculator,
          },
          ...this.manageDatasets,
        ],
      };
    },
  },
  methods: {
    setDatasets(table, array) {
      let datasets = [];
      array.forEach((item) => {
        datasets = [
          ...datasets,
          {
            borderColor: item.color,
            backgroundColor: item.color,
            file: true,
            data: table.map((num) => num[item.id]),
          },
        ];
      });
      return datasets;
    },
  },
};
</script>

<template>
  <div>
    <span>{{ title }}</span>
    <LineChartGenerator
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>
