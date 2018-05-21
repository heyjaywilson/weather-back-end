const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
require("dotenv").config();
const DARK_SKY_URL =
  "https://api.darksky.net/forecast/" + process.env.DARK_SKY_SECRET_KEY + "/";

const GMAP_API_URL =
  "https://maps.googleapis.com/maps/api/geocode/json?address=";
const port = process.env.PORT || 5000;

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === "/favicon.ico") {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
}

app.all("/*", function(req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "http://weather-app.maeganwilson.com"
  );
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(ignoreFavicon);
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/:longlat", (req, res) => {
  console.log("getting current temp");
  let location = req.params.longlat;
  axios
    .get(DARK_SKY_URL + location)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log("we are live on " + port);
});
