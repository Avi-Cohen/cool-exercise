const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

app.use(cors());
app.use(express.json());

const publicDirectory = path.join(__dirname, "views/build");
app.use(express.static(publicDirectory));


const PORT = process.env.PORT || 5000;

const results = [];
const server_data = [
  {
    CustomerID: "123ABC45",
    CustomerName: "-",
    Data1: "568.6442639",
    Data2: "4173.169228",
    Data3: "3014.022072",
    Data4: "7298.987598",
    Data5: "4067.882146",
    Data6: "6770.987528",
    Data7: "6829.049764",
    Data8: "2009.14506",
    Data9: "3780.63598",
    Data10: "9251.477918",
  },
  {
    CustomerID: "DEF_8910",
    CustomerName: "-",
    Data1: "1785.327358",
    Data2: "1339.255851",
    Data3: "9485.281607",
    Data4: "8353.298656",
    Data5: "9067.334268",
    Data6: "9702.075868",
    Data7: "1870.535535",
    Data8: "6735.603013",
    Data9: "4167.283606",
    Data10: "1571.691202",
  },
  {
    CustomerID: "9020010",
    CustomerName: "-",
    Data1: "9496.599831",
    Data2: "4353.370407",
    Data3: "148.0555585",
    Data4: "4522.99489",
    Data5: "4568.064484",
    Data6: "5709.282779",
    Data7: "8929.783241",
    Data8: "8613.605287",
    Data9: "6839.144557",
    Data10: "5089.153612",
  },
];
// fs.createReadStream(
//   "/Users/avicohen/Downloads/WebsiteExcercise/backend_data.csv"
// )
//   .pipe(csv({}))
//   .on("data", (result) => server_data.push(result))
//   .on("end", () => {});

const mergeData = (arr) => {
  const merged = [];
  arr.forEach((element) => {
    // console.log(element[Object.keys(results[0])[0]]);
    // console.log(Object.values(server_data[0])[0]);

    const match = server_data.filter(
      (data) =>
        // data[Object.keys(results[0])[0]] === element[Object.keys(results[0])[0]]
        Object.values(data)[0] === element[Object.keys(results[0])[0]]
    );
    console.log(match);

    match[0].CustomerName = element.CustomerName;
    merged.push(match[0]);
  });
  return merged;
};

app.get("/", (req, res) => {
  res.send(server_data);
});
app.post("/form", (req, res) => {
  const { value } = req.body;
  fs.createReadStream(path.normalize(value))
    .pipe(csv({}))
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.send(JSON.stringify(mergeData(results)));
    });
});
app.listen(PORT, () => console.log(" running on " + PORT));
