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
      collaborator: [],
      updatedAt: 0
    };

    const listTwo = {
      _id: 'testListId2',
      listName: "tests list name 2",
      userId: "testUser2",
      items: [],
      collaborator: [],
      updatedAt: 0
    };

    beforeEach(function() {
      GroceryLists.remove({});
      GroceryLists.insert(listOne);
      GroceryLists.insert(listTwo);
    });

    it("should insert new grocery list", function() {
      const id = "testid1";
      const newListName = 'test list';
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
      Meteor.server.method_handlers["groceryLists.remove"].apply(
        { userId: 'randomId' },
        [listOne._id]
      );

      expect(GroceryLists.findOne({ _id: listOne._id })).toExist();
    });

    it("should return a users lists", function() {
      const res = Meteor.server.publish_handlers.groceryLists.apply({
        userId: listOne.userId
      });
      const lists = res.fetch();

      expect(lists.length).toBe(1);
      expect(lists[0]).toInclude(listOne);
    });

    it("should return no list for user that has none", function() {
      const res = Meteor.server.publish_handlers.groceryLists.apply({
        userId: "randomUser"
      });
      const lists = res.fetch();

      expect(lists.length).toBe(0);
    });
    
    it("should add a collaborator if owner of list", function() {
      const userCollaboratorId = 'testid'
      Meteor.server.method_handlers["groceryLists.updateUsers"].apply(
        { userId: listOne.userId },
        [listOne._id, userCollaboratorId]
      );

      const list = GroceryLists.findOne(listOne._id);
      expect(list.collaborator.length).toBe(1);
      expect(list.collaborator[0]).toContain(userCollaboratorId);
    });

    it("should not add a collaborator if not owner of list", function() {
      const userCollaboratorId = 'testid'
      Meteor.server.method_handlers["groceryLists.updateUsers"].apply(
        { userId: 'ramdonId' },
        [listOne._id, userCollaboratorId]
      );

      const list = GroceryLists.findOne(listOne._id);
      expect(list.collaborator.length).toBe(0);
    });

  });
}
