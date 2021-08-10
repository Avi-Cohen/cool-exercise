const server_data = require("./config/serverData");

const matchedFilter = (x) => {
  return server_data.filter(
    (data) => Object.values(data)[0] === x[Object.keys(results[0])[0]]
  );
};

const mergeData = (arr) => {
  const mergedData = [];
  arr.forEach((element) => {
    const match = matchedFilter(element);
    match[0].CustomerName = element.CustomerName;
    mergedData.push(match[0]);
  });
  return mergedData;
};

const csv_data = [];

module.export = (app) => {
  app.post("/form", (req, res) => {
    const { value } = req.body;
    fs.createReadStream(path.normalize(value))
      .pipe(csv({}))
      .on("data", (data) => csv_data.push(data))
      .on("end", () => {
        res.send(JSON.stringify(mergeData(csv_data)));
      });
  });
};
