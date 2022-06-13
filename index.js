const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

let topTenMovies = [
  { title: "Batman: The Dark Knight", director: "Christopher Nolan" },
  { title: "Inception", director: "Christopher Nolan" },
  { title: "Goodfellas", director: "Martin Scorsese" },
  { title: "Spiderman", director: "Sam Raimi" },
  { title: "The Grey", director: "Joe Canahan" },
  { title: "War Dogs", director: "Todd Phillips" },
  { title: "Short Term 12", director: "Destin Daniel Cretton" },
  { title: "Django Unchained", director: "Quentin Tarantino" },
  { title: "Calibre", director: "Matt Palmer" },
  { title: "Cleaner", director: "Renny Harlin" },
];

app.get("/", (req, res) => {
  res.send("Welcome to my Movie API");
});

app.get("/documentation", (req, res) => {
  res.sendFile("/public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topTenMovies);
});

app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.static("public"));

app.use((err, req, res, next) => {
  res.status(500).send("Something Broke :/");
});

app.listen(5500, () => {
  console.log("Your app is listening on port 5500");
});
