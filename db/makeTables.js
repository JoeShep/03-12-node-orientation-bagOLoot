
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("lootbag.sqlite");
const {
  children
} = require("../data/children");
const {
  toys
} = require("../data/toys");

module.exports.createTables = () => {
  return new Promise((resolve, reject) => {
    db
      .run(`DROP TABLE IF EXISTS children`)
      .run(`DROP TABLE IF EXISTS toys`)
      .run(
        `CREATE TABLE IF NOT EXISTS children(child_id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, isGood INTEGER)`
      )
      .run(
        `CREATE TABLE IF NOT EXISTS toys(toy_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, delivered INTEGER, child_id INTEGER, FOREIGN KEY(child_id) REFERENCES children(child_id))`,
        err => {
          if (err) return reject(err);
          insertChildRows()
            .then(child_ids => {
              return insertToyRows().then(toy_ids => {
                resolve({
                  toys: toy_ids,
                  children: child_ids
                });
              });
            })
            // .then(toysIds => {})
            .catch(err => {
              console.log("oops", err);
            });
        }
      );
  });
};

const insertChildRows = () => {
  return Promise.all(
    children.map(({
      first_name,
      last_name,
      isGood
    }) => {
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO children VALUES (
              null,
              "${first_name}",
              "${last_name}",
              "${isGood}"
            )`,
          function (err) {
            if (err) return reject(err);
            resolve(this.lastID);
          }
        );
      });
    })
  );
};

const insertToyRows = () => {
  return Promise.all(
    toys.map(({
      name,
      delivered,
      child_id
    }) => {
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO toys VALUES (
              null,
              "${name}",
              "${delivered}",
              "${child_id}"
            )`,
          function (err) {
            if (err) return reject(err);
            resolve(this.lastID);
          }
        );
      });
    })
  );
};
