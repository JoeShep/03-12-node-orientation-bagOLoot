const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("lootbag.sqlite");

function splitName(name) {
  return name.split(" ");
}

module.exports.getToysByChild = name => {
  const [first, last] = splitName(name);
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT name FROM toys
      JOIN children
      ON toys.child_id = children.child_id
      WHERE children.first_name = "${first}"
      AND children.last_name = "${last}"`,
      (err, toyData) => {
        if (err) return reject(err);
        console.log("toys", toyData);
        const toyResult =
          toyData.length > 0 ? toyData : "This child has no toys in the bag";
        resolve(toyResult);
      }
    );
  });
};

module.exports.addToy = (toy, childName) => {
  const [first, last] = splitName(childName);
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO toys
    VALUES(
      null,
      "${toy}",
      0,
      ( SELECT child_id FROM children WHERE first_name = "${first}" AND last_name = "${last}")
    )`,
      function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      }
    );
  });
};

module.exports.removeToy = (toy, child) => {
  const [first, last] = splitName(child);
  console.log("toy", toy, first, last);
  return new Promise((resolve, reject) => {
    // Make sure you understand what's going on here. sqlite is finicky about how you do a query involving joins and foreign keys. There's a subquery happening that allows us to find the child's id based on its name and filter our results to only delete a toy if that child_id exists on the toy row. "WHERE...IN" syntax allows you to specify multiple values or, like here, in a subquery.
    db.run(
      `DELETE FROM toys
      WHERE name = "${toy}"
      AND toys.child_id IN (
        SELECT c.child_id from children c
        JOIN toys t
        ON c.child_id = t.child_id
        WHERE c.first_name = "${first}"
        AND c.last_name="${last}"
      )`,
      function(err) {
        if (err) return reject(err);
        console.log("changes", this.changes);
        resolve(
          this.changes === 0
            ? "Cannot delete. Please confirm the toy belongs to the child"
            : "Toy removed from DB"
        );
      }
    );
  });
};

module.exports.getGoodChildren = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT first_name || " " || last_name as name, isGood
    FROM children
    WHERE isGood = 1`,
      (err, children) => {
        resolve(children);
      }
    );
  });
};

module.exports.getGoodChildren = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT first_name || " " || last_name as name, isGood
    FROM children
    WHERE isGood = 1`,
      (err, children) => {
        resolve(children);
      }
    );
  });
};

module.exports.makeChildHappy = child => {
  return new Promise((resolve, reject) => {
    const [first, last] = splitName(child);
    db.run(
      `UPDATE toys
      SET delivered = 1
      WHERE toys.child_id IN (
        SELECT c.child_id from children c
        WHERE c.first_name = "${first}"
        AND c.last_name = "${last}"
      )`,
      function(err) {
        if (err) return reject(err);
        console.log("changes to Yeraldi", this.changes);
        resolve("Toys marked as delivered!");
      }
    );
  });
};
