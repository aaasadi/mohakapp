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
    setTable: {
      type: Function,
      default: () => {},
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
        tension: 0.4,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxis: {
            position: "left",
            ticks: {
              font: {
                family: "IRANSans",
              },
              crossAlign: "far",
            },
            type: "linear",
          },
          xAxis: {
            grid: {
              drawTicks: false,
            },
            ticks: {
              color: "#A3A3A3",
              font: {
                family: "IRANSans",
              },
              padding: 5,
            },
          },
        },
      },
      positions: [],
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
        red: "#d06265",
        orenge: "#ef9884",
        yellow: "#ffd992",
        green: "#8eb07e",
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
    setBMIArray() {
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
              { id: 3, color: this.colors.red },
              { id: 4, color: this.colors.orenge },
              { id: 5, color: this.colors.yellow },
              { id: 6, color: this.colors.green },
              { id: 7, color: this.colors.yellow },
              { id: 8, color: this.colors.orenge },
              { id: 9, color: this.colors.red },
            ]);
          } else if (month < 60) {
            datasets = this.setDatasets(boyBetweenTwoAndFiveYear, [
              { id: 3, color: this.colors.red },
              { id: 4, color: this.colors.orenge },
              { id: 5, color: this.colors.yellow },
              { id: 6, color: this.colors.green },
              { id: 7, color: this.colors.yellow },
              { id: 8, color: this.colors.orenge },
              { id: 9, color: this.colors.red },
            ]);
          } else if (month < 229) {
            datasets = this.setDatasets(boyTopOfFiveYear, [
              { id: 4, color: this.colors.red },
              { id: 5, color: this.colors.orenge },
              { id: 6, color: this.colors.yellow },
              { id: 7, color: this.colors.green },
              { id: 8, color: this.colors.yellow },
              { id: 9, color: this.colors.orenge },
              { id: 10, color: this.colors.red },
            ]);
          }
          break;
        case "girl":
          if (month < 24) {
            datasets = this.setDatasets(girlUnderTwoYear, [
              { id: 3, color: this.colors.red },
              { id: 4, color: this.colors.orenge },
              { id: 5, color: this.colors.yellow },
              { id: 6, color: this.colors.green },
              { id: 7, color: this.colors.yellow },
              { id: 8, color: this.colors.orenge },
              { id: 9, color: this.colors.red },
            ]);
          } else if (month < 60) {
            datasets = this.setDatasets(girlBetweenTwoAndFiveYear, [
              { id: 3, color: this.colors.red },
              { id: 4, color: this.colors.orenge },
              { id: 5, color: this.colors.yellow },
              { id: 6, color: this.colors.green },
              { id: 7, color: this.colors.yellow },
              { id: 8, color: this.colors.orenge },
              { id: 9, color: this.colors.red },
            ]);
          } else if (month < 229) {
            datasets = this.setDatasets(girlTopOfFiveYear, [
              { id: 4, color: this.colors.red },
              { id: 5, color: this.colors.orenge },
              { id: 6, color: this.colors.yellow },
              { id: 7, color: this.colors.green },
              { id: 8, color: this.colors.yellow },
              { id: 9, color: this.colors.orenge },
              { id: 10, color: this.colors.red },
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
            data: this.setBMIArray,
          },
          ...this.manageDatasets,
        ],
        positions: [],
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
            data: table.map((num) => num[item.id]),
          },
        ];
      });
      return datasets;
    },
    createTable() {
      let table = [];
      const { gender, month } = this.data;
      switch (gender) {
        case "boy":
          if (month < 24) {
            table = boyUnderTwoYear[month];
          } else if (month < 60) {
            table = boyBetweenTwoAndFiveYear[month - 24];
          } else if (month < 229) {
            table = boyTopOfFiveYear[month - 60];
          }
          break;
        case "girl":
          if (month < 24) {
            table = girlUnderTwoYear[month];
          } else if (month < 60) {
            table = girlBetweenTwoAndFiveYear[month - 24];
          } else if (month < 229) {
            table = girlTopOfFiveYear[month - 60];
          }
      }
      let result = [];
      if (month < 60) {
        result = [
          table[3],
          table[4],
          table[5],
          table[6],
          table[7],
          table[8],
          table[9],
        ];
      } else {
        result = [
          table[4],
          table[5],
          table[6],
          table[7],
          table[8],
          table[9],
          table[10],
        ];
      }
      this.setTable(result);
      return result;
    },
    setPositions() {
      const { month, gender } = this.data;
      const min = this.$refs.chart._data._chart.scales.yAxis.min;
      const max = this.$refs.chart._data._chart.scales.yAxis.max;
      const height = this.$refs.chart._data._chart.height;
      let array = [];
      switch (gender) {
        case "boy":
          if (month < 24) {
            const index = 24;
            array = [
              boyUnderTwoYear[index][9],
              boyUnderTwoYear[index][8],
              boyUnderTwoYear[index][7],
              boyUnderTwoYear[index][6],
              boyUnderTwoYear[index][5],
              boyUnderTwoYear[index][4],
              boyUnderTwoYear[index][3],
            ];
          } else if (month < 60) {
            const index = 36;
            array = [
              boyBetweenTwoAndFiveYear[index][9],
              boyBetweenTwoAndFiveYear[index][8],
              boyBetweenTwoAndFiveYear[index][7],
              boyBetweenTwoAndFiveYear[index][6],
              boyBetweenTwoAndFiveYear[index][5],
              boyBetweenTwoAndFiveYear[index][4],
              boyBetweenTwoAndFiveYear[index][3],
            ];
          } else {
            const index = 167;
            array = [
              boyTopOfFiveYear[index][10],
              boyTopOfFiveYear[index][9],
              boyTopOfFiveYear[index][8],
              boyTopOfFiveYear[index][7],
              boyTopOfFiveYear[index][6],
              boyTopOfFiveYear[index][5],
              boyTopOfFiveYear[index][4],
            ];
          }
          break;
        case "girl":
          if (month < 24) {
            const index = 24;
            array = [
              girlUnderTwoYear[index][9],
              girlUnderTwoYear[index][8],
              girlUnderTwoYear[index][7],
              girlUnderTwoYear[index][6],
              girlUnderTwoYear[index][5],
              girlUnderTwoYear[index][4],
              girlUnderTwoYear[index][3],
            ];
          } else if (month < 60) {
            const index = 36;
            array = [
              girlBetweenTwoAndFiveYear[index][9],
              girlBetweenTwoAndFiveYear[index][8],
              girlBetweenTwoAndFiveYear[index][7],
              girlBetweenTwoAndFiveYear[index][6],
              girlBetweenTwoAndFiveYear[index][5],
              girlBetweenTwoAndFiveYear[index][4],
              girlBetweenTwoAndFiveYear[index][3],
            ];
          } else {
            const index = 167;
            array = [
              girlTopOfFiveYear[index][10],
              girlTopOfFiveYear[index][9],
              girlTopOfFiveYear[index][8],
              girlTopOfFiveYear[index][7],
              girlTopOfFiveYear[index][6],
              girlTopOfFiveYear[index][5],
              girlTopOfFiveYear[index][4],
            ];
          }
          break;
      }
      console.log(min, max);
      array.forEach((num, index) => {
        let ratio = (num - min) / (max - min);
        let top = (1 - ratio) * (height - 35);
        this.$refs[`number${index}`].style.top = `${top + 10}px`;
      });
    },
  },
  updated() {
    this.createTable();
    this.setPositions();
  },
  mounted() {
    this.setPositions();
  },
};
</script>

<template>
  <div>
    <h2 class="title">{{ title }}</h2>
    <div class="box">
      <div class="numbers" v-if="data.bmi">
        <span class="number" ref="number0" :style="{ color: colors.red }"
          >+3</span
        >
        <span class="number" ref="number1" :style="{ color: colors.orenge }"
          >+2</span
        >
        <span class="number" ref="number2" :style="{ color: colors.yellow }"
          >+1</span
        >
        <span class="number" ref="number3" :style="{ color: colors.green }"
          >0</span
        >
        <span class="number" ref="number4" :style="{ color: colors.yellow }"
          >-1</span
        >
        <span class="number" ref="number5" :style="{ color: colors.orenge }"
          >-2</span
        >
        <span class="number" ref="number6" :style="{ color: colors.red }"
          >-3</span
        >
      </div>
      <LineChartGenerator
        ref="chart"
        class="chart"
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
  </div>
</template>

<style scoped>
.title {
  font-family: "IRANSans" !important;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
}
.box {
  position: relative;
}
.numbers {
  position: absolute;
  right: 1.2rem;
}
.number {
  position: absolute;
  text-align: left;
  direction: ltr;
  left: 0;
  transform: translateY(-50%);
}
.chart {
  padding-right: 1.2rem;
}
</style>
