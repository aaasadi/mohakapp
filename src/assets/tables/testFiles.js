const file = require("./girl_between_2_and_5_year.json");

// const data = JSON.parse(file);

let errors = 0;
file.forEach((item) => {
  if (item.length != 10) {
    errors++;
  }
});

console.log(`Erorrs: ${errors}`);
