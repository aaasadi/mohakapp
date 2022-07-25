<script>
export default {
  name: "showResult",
  props: ["age", "month", "bmi", "table"],
  computed: {
    result() {
      const { month, bmi, table } = this;
      // month < 24
      if (month < 60) {
        // bmi < -3
        if (bmi < table[0]) {
          return "کم وزنی شدید";
        }
        // -3 < bmi < -2
        else if (bmi < table[1]) {
          return "کم وزنی";
        }
        // -2 < bmi < +1
        else if (bmi < table[4]) {
          return "وزن طبیعی";
        }
        // +1 < bmi < +2
        else if (bmi < table[5]) {
          return "احتمال اضافه وزن";
        }
        // +2 < bmi < +3
        else if (bmi < table[6]) {
          return "پر وزنی";
        }
        // bim > +3
        else {
          return "چاقی";
        }
      }
      // month > 60
      else {
        // bmi < -3
        if (bmi < table[0]) {
          return "کم وزنی شدید";
        }
        // -3 < bmi < -2
        else if (bmi < table[1]) {
          return "کم وزنی";
        }
        // -2 < bmi < +1
        else if (bmi < table[4]) {
          return "وزن طبیعی";
        }
        // +1 < bmi < +2
        else if (bmi < table[5]) {
          return "پر وزنی";
        }
        // bim > +2
        else {
          return "چاقی";
        }
      }
    },
  },
};
</script>

<template>
  <p class="mt-5" v-if="month > 0">
    فرزند شما دارای سن
    <span v-if="age.year > 0">{{ age.year }} سال</span>
    <span v-if="age.year > 0 && age.month > 0"> و</span>
    <span v-if="age.month > 0">{{ age.month }} ماه</span>
    و BMI ایشان
    {{ bmi }}
    و این مقدار برای فرزند شما نشان‌دهنده
    <b>{{ result }}</b>
    می‌باشد
  </p>
</template>
