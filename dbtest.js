const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./lessons.sqlite3", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});
db.all(
  "SELECT DISTINCT  name, standard, image FROM api_lesson LEFT JOIN api_screen ON api_lesson.id = api_screen.lesson_id",
  [],
  (err, rows) => {
    console.log(rows);
  }
);

// db.all("select * from api_screen", [], (err, rows) => {
//   console.log(rows);
// });
// close the database connection
db.close(err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
