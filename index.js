const sqlite3 = require("sqlite3").verbose();

// open database in memory
let db = new sqlite3.Database("./lessons.sqlite3", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

db.all("select * from api_lesson", [], (err, rows) => {
  console.log(rows);
});

db.all("select * from api_screen", [], (err, rows) => {
  console.log(rows);
});
// close the database connection
db.close(err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
