const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const apiController = require('./controllers/apiController')
const setupController = require('./controllers/setupController')

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const publicDirectory = path.join(__dirname, "views/build");
//app.use(express.static(publicDirectory));

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static(publicDirectory));
  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'build', 'index.html'));
  });
}
apiController(app)
setupController(app)

app.listen(PORT, () => console.log(" running on " + PORT));
