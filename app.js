const express = require("express");
const app = express();
const path = require("path");

//middleware
app.use(express.static(path.join(__dirname, "./public")));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  let url = `http://universities.hipolabs.com/search?country=australia`;
  let country = 'Australia';

  let response = await fetch(url); // use the fetch method
  let unis = await response.json(); // read response body and parse as JSON
  res.render("index", { uni_data: unis, country: country});
});

app.get("/:country", async (req, res) => {
  let country = req.params.country;
  if (country === "usa") {
    country = "united+states";
  }

  let url = `http://universities.hipolabs.com/search?country=${country}`;
  let response = await fetch(url); // use the fetch method
  let unis = await response.json(); // read response body and parse as JSON
  res.render("index", { uni_data: unis, country: country});
});

app.listen(3000, () => {
  console.log("Server is listening on port localhost:3000");
});
