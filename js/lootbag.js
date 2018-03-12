const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("lootbag.sqlite");

module.exports.getToysByChild = () => {
  return new Promise( (resolve, reject) => {
    resolve([]);
  });
};

module.exports.addToy = () => {
  return new Promise( (resolve, reject) => {
    resolve(6);
  });
};

module.exports.removeToy = () => {
  return new Promise((resolve, reject) => {
    resolve("Toy removed from DB");
  });
};

module.exports.getGoodChildren = () => {
  return new Promise( (resolve, reject) => {
    resolve([]);
  });
}

module.exports.makeChildHappy = () => {
  return new Promise( (resolve, reject) => {
    resolve("Toys marked as delivered");
  });
};
