const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const bodyParser = require("body-parser");
var logger = require("morgan");

const app = express();
const PORT = process.env.PORT || 3001;

let db = new sqlite3.Database("./lessons.sqlite3", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

app.use(logger("dev"));
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.get("/api", (req, res) => {
  db.all(
    "select DISTINCT  name, standard, image  FROM api_lesson  LEFT JOIN api_screen ON api_lesson.id = api_screen.lesson_id",
    [],
    (err, rows) => {
      res.send(rows);
    }
  );
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

//
//
// db.all("select * from api_screen", [], (err, rows) => {
//   console.log(rows);
// });
// // close the database connection
// db.close(err => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log("Close the database connection.");
// });
