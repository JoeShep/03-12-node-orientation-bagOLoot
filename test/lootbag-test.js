const {
  assert: { isTrue, equal, isObject, deepEqual, isArray, notInclude }
} = require("chai");
const { createTables } = require("../db/makeTables");
const { getToysByChild, addToy, removeToy, getGoodChildren, makeChildHappy } = require('../js/lootbag');


describe("lootbag", () => {
  beforeEach(done => {
    createTables().then(() => {
      done();
    });
  });

  // Must be able to list all toys for a given child's name.
  describe("getToysByChild", () => {
    it("should return an array", () => {
      return getToysByChild()
      .then( (data) => {
        isArray(data);
      })
    });
  });

  // Items can be added to bag, and assigned to a child.
  describe("addToy", () => {
    it("should return ID of added item", () => {
      return addToy()
      .then( (toyId) => {
        equal(toyId, 6);
      });
    });
  });

  // Items can be removed from bag, per child only. Removing ball from the bag should not be allowed. A child's name must be specified.
  describe("removeToy", () => {
    it("should verify that a toy was removed", () => {
      const expected = "Toy removed from DB";
      return removeToy()
      .then( (msg) => {
        equal(msg, expected);
      });
    });
  });

  // Must be able to list all children who are getting a toy.
  describe("getGoodChildren", () => {
    it("should return an array", () => {
      return getGoodChildren()
      .then( (kids) => {
        isArray(kids);
      });
    });
  });

  //Must be able to set the delivered property of a child, which defaults to false, to true.
  describe("makeChildHappy", () => {
    it("should return a confirmation", () => {
      return makeChildHappy()
      .then( (msg) => {
        equal("Toys marked as delivered", msg);
      });
    });
  });
});
