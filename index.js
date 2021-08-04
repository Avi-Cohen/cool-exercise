const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

app.use(express.json());

const PORT = 5000;

app.use(cors());
app.use(express.json());

const publicDirectory = path.join(__dirname, "client/build");
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.send({ name: "avi" });
});
app.post("/form", (req, res) => {
  const results = [];
  const { value } = req.body;
  fs.createReadStream(value)
    .pipe(csv({}))
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log(results);
      res.send(results);
    });
});
app.listen(PORT, () => console.log(" running on " + PORT));
