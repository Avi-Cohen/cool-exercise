const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

app.use(express.json());

const PORT = process.env.PORT || 5000;

const results = [];
const server_data = [];
fs.createReadStream(
  "/Users/avicohen/Downloads/WebsiteExcercise/backend_data.csv"
)
  .pipe(csv({}))
  .on("data", (result) => server_data.push(result))
  .on("end", () => {});

app.use(cors());
app.use(express.json());

const mergeData = (arr) => {
  const merged = [];
  arr.forEach((element) => {
    const match = server_data.filter(
      (data) =>
        data[Object.keys(results[0])[0]] === element[Object.keys(results[0])[0]]
    );
    match[0].CustomerName = element.CustomerName;
    merged.push(match[0]);
  });
  return merged;
};
const publicDirectory = path.join(__dirname, "client/build");
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.send({ name: "avi" });
});
app.post("/form", (req, res) => {
  const { value } = req.body;
  fs.createReadStream(value)
    .pipe(csv({}))
    .on("data", (data) => results.push(data))
    .on("end", () => {      
      res.send(JSON.stringify(mergeData(results)));
    });
});
app.listen(PORT, () => console.log(" running on " + PORT));
