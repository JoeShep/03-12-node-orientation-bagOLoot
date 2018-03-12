const {
  assert: { isTrue, equal, isObject, deepEqual, isArray, notInclude }
} = require("chai");
const { createTables } = require("../db/makeTables");
const {
  getToysByChild,
  addToy,
  removeToy,
  getGoodChildren,
  makeChildHappy
} = require("../js/lootbag");

describe("lootbag", () => {
  beforeEach(done => {
    createTables().then(() => {
      done();
    });
  });

  // Must be able to list all toys for a given child's name.
  describe("getToysByChild", () => {
    it("should return an array", () => {
      return getToysByChild("Sally Smith").then(data => {
        isArray(data);
      });
    });

    it("should contain a collection of objects", () => {
      return getToysByChild("Sally Smith").then(toyData => {
        isObject(toyData[0]);
      });
    });

    it("should return properties of a child's toy", () => {
      return getToysByChild("Sally Smith").then(toyData => {
        equal(toyData[0].name, "Game Boy");
      });
    });

    it("should return a msg if a child has no toys", () => {
      return getToysByChild("Günter Berger").then(msg => {
        equal("This child has no toys in the bag", msg);
      });
    });
  });

  // Items can be added to bag, and assigned to a child.
  // Had to refactor this test to pass in arguments, since refactored method added "toy" and "childName" parameters
  describe("addToy", () => {
    it("should return ID of added item", () => {
      return addToy("Barbie Doll", "Bubba Dorkus").then(toyId => {
        equal(toyId, 6);
      });
    });

    it("should add a new toy to the db", () => {
      return addToy("Barbie Doll", "Bubba Dorkus")
        .then(lastID => {
          return getToysByChild("Bubba Dorkus");
        })
        .then(toys => {
          deepEqual(toys.pop(), {
            name: "Barbie Doll"
          });
        });
    });
  });

  // Items can be removed from bag, per child only. Removing ball from the bag should not be allowed. A child's name must be specified.
  describe("removeToy", () => {
    it("should verify that a toy was removed", () => {
      const expected = "Toy removed from DB";
      return removeToy().then(msg => {
        equal(msg, expected);
      });
    });
  });

  // Must be able to list all children who are getting a toy.
  describe("getGoodChildren", () => {
    it("should return an array", () => {
      return getGoodChildren().then(kids => {
        isArray(kids);
      });
    });
  });

  //Must be able to set the delivered property of a child, which defaults to false, to true.
  describe("makeChildHappy", () => {
    it("should return a confirmation", () => {
      return makeChildHappy().then(msg => {
        equal("Toys marked as delivered", msg);
      });
    });
  });
});
