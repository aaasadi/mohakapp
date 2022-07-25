<script>
import moment from "jalali-moment";
export default {
  name: "FormBox",
  props: ["setData"],
  data: () => ({
    weight: 18,
    height: 90,
    BMI: null,
    gender: "boy",
    year: 1397,
    month: 10,
    day: 15,
  }),
  computed: {},
  methods: {
    getAllMonth() {
      const m = moment.from(
        `${this.year}/${this.month}/${this.day}`,
        "fa",
        "YYYY/MM/DD"
      );
      const dateOfBirth = new Date(m.locale("en").format("YYYY/MM/DD"));
      const now = new Date();
      let year = now.getUTCFullYear() - dateOfBirth.getUTCFullYear();
      let month = now.getMonth() - dateOfBirth.getMonth();
      return year * 12 + month;
    },
    submit() {
      this.BMI = Math.round((this.weight / this.height ** 2) * 100000) / 10;

      this.setData({
        bmi: this.BMI,
        gender: this.gender,
        month: this.getAllMonth(),
      });
    },
  },
};
</script>

<template>
  <div class="box">
    <v-img src="../assets/img.webp" class="image-rounded" />
    <form @submit.prevent="submit">
      <v-row class="my-5" no-gutters align="center">
        <label>جنسیت</label>
        <v-spacer />
        <v-radio-group class="mt-0" v-model="gender" hide-details>
          <v-row align="center" no-gutters>
            <v-radio value="boy" label="پسر" class="mb-0 ml-5" />
            <v-radio value="girl" label="دختر" />
          </v-row>
        </v-radio-group>
      </v-row>
      <v-text-field
        class="dateField mb-3"
        v-model="weight"
        label="وزن"
        outlined
        suffix="کیلوگرم"
        type="number"
        placeholder="وزن کودک خود را وارد کنید"
        hide-details
      />

      <v-text-field
        class="dateField mb-3"
        v-model="height"
        label="قد"
        outlined
        suffix="سانتی‌متر"
        type="number"
        placeholder="قد کودک خود را وارد کنید"
        hide-details
      />

      <label>تاریخ تولد</label>
      <v-row
        class="my-3"
        no-gutters
        align="center"
        style="flex-wrap: nowrap; gap: 10px"
      >
        <v-text-field
          v-model="day"
          class="dateField ltr"
          outlined
          type="number"
          label="روز"
          hide-details
        />
        <!-- <v-icon class="px-2">mdi-slash-forward</v-icon> -->
        <v-text-field
          v-model="month"
          class="dateField ltr"
          outlined
          type="number"
          label="ماه"
          hide-details
        />
        <!-- <v-icon class="px-2">mdi-slash-forward</v-icon> -->
        <v-text-field
          v-model="year"
          class="dateField ltr"
          outlined
          type="number"
          label="سال"
          hide-details
        />
      </v-row>

      <v-btn type="submit" color="primary" height="56" class="button" block>
        محاسبه منحنی رشد
      </v-btn>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.box {
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0px 0px 25px rgb(0 0 0 / 10%);
  border-radius: 1rem;
}
.dateField {
  &::v-deep() input::-webkit-outer-spin-button,
  &::v-deep() input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::v-deep() input[type="number"] {
    -moz-appearance: textfield;
  }
}
.ltr {
  direction: ltr;
}
.button {
  letter-spacing: normal;
}
.image-rounded {
  border-radius: 16px;
}
</style>
