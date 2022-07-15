<script>
import moment from "jalali-moment";
export default {
  name: "FormBox",
  props: ["setData"],
  data: () => ({
    weight: 22,
    height: 105,
    BMI: null,
    gender: "boy",
    year: 1400,
    month: 8,
    day: 24,
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
  <div>
    <v-img src="../assets/img.webp" />
    <form @submit.prevent="submit">
      <v-row class="mb-3" no-gutters align="center">
        <label>جنسیت</label>
        <v-spacer />
        <v-radio-group v-model="gender" hide-details>
          <v-row align="center" no-gutters>
            <v-radio value="boy" label="پسر" class="mb-0 ml-5" />
            <v-radio value="girl" label="دختر" />
          </v-row>
        </v-radio-group>
      </v-row>
      <v-text-field
        class="mb-3"
        v-model="weight"
        label="وزن"
        outlined
        suffix="کیلوگرم"
        placeholder="وزن کودک خود را وارد کنید"
        hide-details
      />

      <v-text-field
        class="mb-3"
        v-model="height"
        label="قد"
        outlined
        suffix="سانتی‌متر"
        placeholder="قد کودک خود را وارد کنید"
        hide-details
      />

      <label>تاریخ تولد</label>
      <v-row
        class="mb-3"
        no-gutters
        align="center"
        style="flex-wrap: nowrap; gap: 10px"
      >
        <v-text-field
          v-model="day"
          class="dateField"
          outlined
          type="number"
          label="روز"
          hide-details
        />
        <!-- <v-icon class="px-2">mdi-slash-forward</v-icon> -->
        <v-text-field
          v-model="month"
          class="dateField"
          outlined
          type="number"
          label="ماه"
          hide-details
        />
        <!-- <v-icon class="px-2">mdi-slash-forward</v-icon> -->
        <v-text-field
          v-model="year"
          class="dateField"
          outlined
          type="number"
          label="سال"
          hide-details
        />
      </v-row>

      <v-btn type="submit" color="primary" block> محاسبه منحنی رشد </v-btn>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.dateField {
  direction: ltr;
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
</style>
