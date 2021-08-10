const server_data = require("./config/serverData");

module.export = (app) => {
    app.get("/", (req, res) => {
        res.send(server_data);
      });
}