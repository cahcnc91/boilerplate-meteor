import { Meteor } from "meteor/meteor";
var expect = require("expect");

import { GroceryLists } from "./grocery-list";

if (Meteor.isServer) {
  describe("groceryLists", function() {
    const listOne = {
      _id: 'testListId1',
      listName: "tets list name 1",
      userId: "testUser1",
      items: [],
      updatedAt: 0
    };

    const listTwo = {
      _id: 'testListId2',
      listName: "tests list name 2",
      userId: "testUser2",
      items: [],
      updatedAt: 0
    };

    beforeEach(function() {
      GroceryLists.remove({});
      GroceryLists.insert(listOne);
      GroceryLists.insert(listTwo);
    });

    it("should insert new grocery list", function() {
      const id = "testid1";
      const newListName = "New name";
      const _id = Meteor.server.method_handlers["groceryLists.insert"].apply(
        { userId: id },
        [newListName]
      );

      expect(GroceryLists.find({ _id, id })).toExist();
    });

    it("should not insert list if not authenticated", function() {
      expect(() => {
        Meteor.server.method_handlers["groceryLists.insert"]();
      }).toThrow();
    });

    it("should remove a list", function() {
      Meteor.server.method_handlers["groceryLists.remove"].apply(
        { userId: listOne.userId },
        [listOne._id]
      );

      expect(GroceryLists.findOne({ _id: listOne._id })).toNotExist();
    });

    it("should not remove list if not authenticated", function() {
      expect(() => {
        Meteor.server.method_handlers["groceryLists.remove"].apply({}, [
          listOne._id
        ]);
      }).toThrow();
    });

    it("should not remove a list if invalid id", function() {
      expect(() => {
        Meteor.server.method_handlers["groceryLists.remove"].apply({
          userId: "testUserId1"
        });
      }).toThrow();
    });

    it("should update list", function() {
      const listName = "This is a updated title for test list.";

      Meteor.server.method_handlers["groceryLists.update"].apply(
        {
          userId: listOne.userId
        },
        [listOne._id, { listName }]
      );

      const list = GroceryLists.findOne(listOne._id);
      expect(list).toInclude({
        listName
      });
    });

    it("should not update if extra updates", function() {
      expect(() => {
        Meteor.server.method_handlers["groceryLists.update"].apply(
          {
            userId: listOne.userId
          },
          [listOne._id, { listName: "new name", nameTest: "Camila" }]
        );
      }).toThrow();
    });

    it("should not update list if user was not creator", function() {
      const listName = "This is a updated title for test list2.";

      Meteor.server.method_handlers["groceryLists.update"].apply(
        {
          userId: "RandomId"
        },
        [listOne._id, { listName }]
      );

      const list = GroceryLists.findOne(listOne._id);

      expect(list).toInclude(listOne);
    });

    it("should not update list if not authenticated", function() {
      const listName = "This is a updated title for test list3.";
      expect(() => {
        Meteor.server.method_handlers["groceryLists.update"].apply({}, [
          listOne._id,
          { listName }
        ]);
      }).toThrow();
    });

    it("should not update a list if invalid id", function() {
      expect(() => {
        Meteor.server.method_handlers["groceryLists.remove"].apply({
          userId: "testUserId1"
        });
      }).toThrow();
    });

    it("should return a users lists", function() {
      const res = Meteor.server.publish_handlers.groceryLists.apply({
        userId: listOne.userId
      });
      const lists = res.fetch();

      expect(lists.length).toBe(1);
      expect(lists[0]).toInclude(listOne);
    });

    it("should return no notes for user that has none", function() {
      const res = Meteor.server.publish_handlers.groceryLists.apply({
        userId: "randomUser"
      });
      const lists = res.fetch();

      expect(lists.length).toBe(0);
    });
  });
}
