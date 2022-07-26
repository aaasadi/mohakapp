<script>
import { required, max_value, min_value } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import moment from "jalali-moment";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} الزامی است",
});

extend("max", {
  ...max_value,
  message: "{_field_} نباید بیشتر از {max} باشد",
});
extend("min", {
  ...min_value,
  message: "{_field_} نباید کمتر از {min} باشد",
});

export default {
  name: "FormBox",
  props: ["setData"],
  components: { ValidationProvider, ValidationObserver },
  data: () => ({
    weight: null,
    height: null,
    BMI: null,
    gender: "boy",
    year: null,
    month: null,
    day: null,
  }),
  computed: {
    maxYear() {
      const year = moment().locale("fa").format("YYYY");
      return parseInt(year);
    },
    minYear() {
      return this.maxYear - 19;
    },
  },
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
      this.$refs.observer.validate();
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
    <validation-observer ref="observer" v-slot="{ invalid }">
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
        <validation-provider
          v-slot="{ errors }"
          rules="required|max:150|min:1"
          name="وزن"
        >
          <v-text-field
            class="dateField mb-3"
            v-model="weight"
            label="وزن"
            outlined
            suffix="کیلوگرم"
            type="number"
            placeholder="وزن کودک خود را وارد کنید"
            :error-messages="errors"
            hide-details="auto"
          />
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          rules="required|max:250|min:20"
          name="قد"
        >
          <v-text-field
            class="dateField mb-3"
            v-model="height"
            label="قد"
            outlined
            suffix="سانتی‌متر"
            type="number"
            placeholder="قد کودک خود را وارد کنید"
            :error-messages="errors"
            hide-details="auto"
          />
        </validation-provider>
        <label>تاریخ تولد</label>
        <v-row
          class="my-3"
          no-gutters
          align="center"
          style="flex-wrap: nowrap; gap: 10px"
        >
          <validation-provider
            class="dateField ltr"
            v-slot="{ errors }"
            rules="required|max:31|min:1"
            name="روز"
          >
            <v-text-field
              v-model="day"
              outlined
              type="number"
              label="روز"
              :error-messages="errors"
              hide-details="auto"
            />
          </validation-provider>
          <validation-provider
            class="dateField ltr"
            v-slot="{ errors }"
            rules="required|max:12|min:1"
            name="ماه"
          >
            <v-text-field
              v-model="month"
              outlined
              type="number"
              label="ماه"
              :error-messages="errors"
              hide-details="auto"
            />
          </validation-provider>
          <validation-provider
            class="dateField ltr"
            v-slot="{ errors }"
            :rules="`required|max:${maxYear}|min:${minYear}`"
            name="سال"
          >
            <v-text-field
              v-model="year"
              outlined
              type="number"
              label="سال"
              :error-messages="errors"
              hide-details="auto"
            />
          </validation-provider>
        </v-row>

        <v-btn
          type="submit"
          :disabled="invalid"
          color="primary"
          height="56"
          class="button"
          block
        >
          محاسبه منحنی رشد
        </v-btn>
      </form>
    </validation-observer>
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
  width: 100%;
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
