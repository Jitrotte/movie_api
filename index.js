const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

app.use(bodyParser.json());

// const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
//   flags: "a",
// });

let users = [
  {
    id: 1,
    name: "James",
    favoriteMovies: [],
  },
  {
    id: 2,
    name: "Chase",
    favoriteMovies: ["Calibre"],
  },
];

let movies = [
  {
    title: "Calibre",
    Description:
      "A shocking deed turned their weekend trip into a nightmare. Now their only hope is to swallow their paranoia and act normal. A shocking deed turned their weekend trip into a nightmare.",
    Genre: {
      Name: "Suspense",
      Description:
        "Used for works whose prime purpose is to produce a feeling of frightened anticipation. These works may contain secondary elements, espionage, romance, or psychology.",
    },
    Director: {
      Name: "Matt Palmer",
      Bio: "Matt Palmer is a writer and director, known for Calibre (2018), The Gas Man (2014) and Island (2007).",
      Birth: 1989,
    },
    ImageURL:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2F7%2F75%2FCalibre_poster.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCalibre_(film)&tbnid=dC6PEw_eDq_7TM&vet=12ahUKEwjs-fe7yav4AhVXY80KHZ1iC_EQMygAegUIARC2AQ..i&docid=UDuDTVAUItiguM&w=220&h=326&q=Calibre%20movie%20Description&ved=2ahUKEwjs-fe7yav4AhVXY80KHZ1iC_EQMygAegUIARC2AQ",
    Featured: true,
  },
  {
    Title: "Cleaner",
    Description:
      "The story centers on a former cop (Samuel L. Jackson) who makes his living cleaning up crime scenes. After cleaning a murder site, he discovers that the crime was never reported to the police and that he has unwittingly covered up a homicide.",

    Genre: {
      Name: "Crime",
      Description:
        "Crime fiction, detective story, murder mystery, mystery novel, and police novel are terms used to describe narratives that centre on criminal acts and especially on the investigation, either by an amateur or a professional detective, of a serious crime, generally a murder.",
    },
    Director: {
      Name: "Renny Harlin",
      Bio: "Finnish film director, producer, and screenwriter who has made his career in Hollywood and China.",
      Birth: 1959,
    },
    ImageURL:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BMmNiYTFkZWEtMWFiOC00MzU1LTkyZGQtNTQ0YmIwYTU2ODM4XkEyXkFqcGdeQXVyNDk3NzU2MTQ%40._V1_.jpg&imgrefurl=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt0896798%2F&tbnid=9EZ8-gRkfNnxAM&vet=12ahUKEwjlgoHvzqv4AhXaQ80KHUYbDiIQMygAegUIARDEAQ..i&docid=RwJks_XZEQvGYM&w=1000&h=1500&q=cleaner%20movie&ved=2ahUKEwjlgoHvzqv4AhXaQ80KHUYbDiIQMygAegUIARDEAQ",
    Featured: true,
  },
];

//CREATE
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Users need a Name");
  }
});

// READ
app.get("/", (req, res) => {
  res.send("Welcome to my Movie API");
});

//READ
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

//READ
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("Not a Movie!");
  }
});

//READ
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("Not a genre!");
  }
});

//READ
app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("Not a Director!");
  }
});

//UPDATE

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("User not found");
  }
});

// POST

app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("User not found");
  }
});

//DELETE
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("User not found");
  }
});

//DELETE
app.delete("/users/:id", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send("User not found");
  }
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080");
});
