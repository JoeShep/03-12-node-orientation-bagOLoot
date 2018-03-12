const sqlite3 = require("sqlite3").verbose();
const {
  createTables
} = require("./makeTables");

(function createDb() {
  new sqlite3.Database("lootbag.sqlite", () => {
    createTables()
      .then(data => {
        console.log("toy stuff", data);
      })
      .catch(err => {
        console.log("oops", err);
      });
  });
})();
