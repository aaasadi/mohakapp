<script>
import girls_bmi from "./../assets/tables/girls_bmi.json";
import boys_bmi from "./../assets/tables/boys_bmi.json";

export default {
  name: "HorizontalChartView",
  props: ["data"],
  methods: {
    calculate() {
      let { month, gender, bmi } = this.data;
      if (month == null || gender == null || bmi == null) {
        return -1;
      }
      if (month < 24) month = 24;
      if (month > 240) month = 240;

      let percentiles_array;
      switch (gender) {
        case "boy":
          percentiles_array = boys_bmi;
          break;
        case "girl":
          percentiles_array = girls_bmi;
      }
      let key = month - 24,
        L = 0,
        M = 0,
        S = 0,
        P = 0,
        Z = 0;

      L = percentiles_array[key][0];
      M = percentiles_array[key][1];
      S = percentiles_array[key][2];

      if (!isNaN(M) && !isNaN(S)) {
        if (L == 0) {
          Z = Math.log(bmi / M) / S;
        } else {
          Z = (Math.pow(bmi / M, L) - 1) / (L * S);
        }

        P =
          1 -
          (1 / Math.sqrt(2 * 3.14159265)) *
            Math.exp(-Math.pow(Math.abs(Z), 2) / 2) *
            (0.4361836 * (1 / (1 + 0.33267 * Math.abs(Z))) -
              0.1201676 * Math.pow(1 / (1 + 0.33267 * Math.abs(Z)), 2) +
              0.937298 * Math.pow(1 / (1 + 0.33267 * Math.abs(Z)), 3));

        let centile = 0;
        if (Z > 0) {
          centile = P * 100;
        } else {
          centile = 100 - P * 100;
        }

        centile = Math.round(centile);

        return centile;
      } else {
        return -1; // error val
      }
    },
  },
};
</script>

<template>
  <div class="box">
    <div class="separator" :style="`left: calc(5% - 25px); width: 50px`">
      <div id="regular"></div>
      5 %
    </div>
    <div class="separator" :style="`left: calc(95% - 25px); width: 50px`">
      <div id="regular"></div>
      95 %
    </div>
    <div class="chart"></div>
    <div
      v-if="calculate() > 0"
      class="degree"
      :style="`left: calc(${this.calculate()}% - 25px); width: 50px`"
    >
      {{ this.calculate() }}%
      <v-icon large>mdi-triangle-small-down</v-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  margin-top: 50px !important;
  position: relative;
  .separator {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    position: absolute;
    top: 0px;
    #regular {
      width: 2px;
      height: 56px;
      background-color: #333;
    }
  }
  .degree {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    top: -40px;
    .v-icon {
      height: 10px;
    }
  }
}
.chart {
  width: 100%;
  height: 56px;
  background-image: linear-gradient(
    to right,
    #9a9a9a 0%,
    #9a9a9a 5%,
    #4ba42f 28%,
    #4ba42f 75%,
    #fdd504 90%,
    #fdd504 94%,
    #e02a2a
  );
}
</style>
