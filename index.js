const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const query = req.body.query;
  const Key = "77e66a0bdf9f01617cbea598cc754ccc";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    Key +
    "&units=" +
    unit;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const WeatherData = JSON.parse(data);
      const temp = WeatherData.main.temp;
      const description = WeatherData.weather[0].description;
      const icon = WeatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/w/" + icon + ".png";

      res.write("<h1>Temperature is " + temp + "</h1>");
      res.write("<p>" + description + "</p>");
      res.write('<img id="wicon" src="' + iconURL + '" alt="Weather icon">');

      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log(`Server is running on port 3000`);
});
