const fs = require("fs");
const entry =
  "-0.0631|13.3363|0.09272|10.1|11.1|12.2|13.3|14.6|16.1|17.7 0.3448|14.5679|0.09556|10.8|12|13.2|14.6|16|17.5|19.1 0.1749|15.7679|0.09371|11.8|13|14.3|15.8|17.3|19|20.7 0.0643|16.3574|0.09254|12.4|13.6|14.9|16.4|17.9|19.7|21.5 -0.0191|16.6703|0.09166|12.7|13.9|15.2|16.7|18.3|20|22 -0.0864|16.8386|0.09096|12.9|14.1|15.4|16.8|18.4|20.2|22.2 -0.1429|16.9083|0.09036|13|14.1|15.5|16.9|18.5|20.3|22.3 -0.1916|16.902|0.08984|13|14.2|15.5|16.9|18.5|20.3|22.3 -0.2344|16.8404|0.08939|13|14.1|15.4|16.8|18.4|20.2|22.2 -0.2725|16.7406|0.08898|12.9|14.1|15.3|16.7|18.3|20.1|22.1 -0.3068|16.6184|0.08861|12.9|14|15.2|16.6|18.2|19.9|21.9 -0.3381|16.4875|0.08828|12.8|13.9|15.1|16.5|18|19.8|21.8 -0.3667|16.3568|0.08797|12.7|13.8|15|16.4|17.9|19.6|21.6 -0.3932|16.2311|0.08768|12.6|13.7|14.9|16.2|17.7|19.5|21.4 -0.4177|16.1128|0.08741|12.6|13.6|14.8|16.1|17.6|19.3|21.3 -0.4407|16.0028|0.08716|12.5|13.5|14.7|16|17.5|19.2|21.1 -0.4623|15.9017|0.08693|12.4|13.5|14.6|15.9|17.4|19.1|21 -0.4825|15.8096|0.08671|12.4|13.4|14.5|15.8|17.3|18.9|20.9 -0.5017|15.7263|0.0865|12.3|13.3|14.4|15.7|17.2|18.8|20.8 -0.5199|15.6517|0.0863|12.3|13.3|14.4|15.7|17.1|18.8|20.7 -0.5372|15.5855|0.08612|12.2|13.2|14.3|15.6|17|18.7|20.6 -0.5537|15.5278|0.08594|12.2|13.2|14.3|15.5|17|18.6|20.5 -0.5695|15.4787|0.08577|12.2|13.1|14.2|15.5|16.9|18.5|20.4 -0.5846|15.438|0.0856|12.2|13.1|14.2|15.4|16.9|18.5|20.4 -0.5989|15.4052|0.08545|12.1|13.1|14.2|15.4|16.8|18.4|20.3";

const array = entry.split(" ");
const result = new Array();
array.forEach((item) => {
  const arr = item.split("|");
  result.push(arr);
});

const data = JSON.stringify(result);

fs.writeFile("girl_under_two_year.json", data, (err) => {
  if (err) {
    throw err;
  }
  console.log("Json data is saved");
});
