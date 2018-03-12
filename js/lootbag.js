const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("lootbag.sqlite");

function splitName(name) {
  return name.split(" ");
}

module.exports.getToysByChild = (name) => {
  const [first, last ] = splitName(name);
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT name FROM toys
      JOIN children
      ON toys.child_id = children.child_id
      WHERE children.first_name = "${first}"
      AND children.last_name = "${last}"`,
      (err, toyData) => {
        if(err) return reject(err);
        console.log('toys', toyData );
        const toyResult = toyData.length > 0 ? toyData : "This child has no toys in the bag"
        resolve(toyResult);
      }
    );
  });
};

module.exports.addToy = () => {
  return new Promise((resolve, reject) => {
    resolve(6);
  });
};

module.exports.removeToy = () => {
  return new Promise((resolve, reject) => {
    resolve("Toy removed from DB");
  });
};

module.exports.getGoodChildren = () => {
  return new Promise((resolve, reject) => {
    resolve([]);
  });
};

module.exports.makeChildHappy = () => {
  return new Promise((resolve, reject) => {
    resolve("Toys marked as delivered");
  });
};
