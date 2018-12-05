import { Meteor } from "meteor/meteor";
var expect = require("expect");

import { GroceryLists } from "./grocery-list";

if (Meteor.isServer) {
  describe("groceryLists-items", function() {
    const listOne = {
      _id: 'testListId1',
      listName: "tets list name 1",
      userId: "testUser1",
      items: [{
        _id: {
          _str: 'testId'
        },
        name: "banana",
        checked: false
      }],
      collaborator: ['userId2'],
      updatedAt: 0
    };

    const listTwo = {
      _id: 'testListId2',
      listName: "tets list name 2",
      userId: "testUser2",
      items: [{
        _id: {
          _str: 'testId2'
        },
        name: "orange",
        checked: false
      }],
      collaborator: ['userId3'],
      updatedAt: 0
    };

    beforeEach(function() {
      GroceryLists.remove({});
      GroceryLists.insert(listOne);
      GroceryLists.insert(listTwo);
    });

    it("should remove a item from list", function() {
      Meteor.server.method_handlers["groceryLists.removeItem"].apply(
        { userId: listOne.userId },
        [listOne._id, listOne.items[0]._id]
      );

      expect(GroceryLists.findOne({ _id: listOne._id, items: { $elemMatch: { _id: listOne.items[0]._id } }   })).toNotExist();
    });

    it("should not remove a item from list if not owner of list", function() {
      Meteor.server.method_handlers["groceryLists.removeItem"].apply(
        { userId: 'randomId' },
        [listOne._id, listOne.items[0]._id]
      );

      expect(GroceryLists.findOne({ _id: listOne._id, items: { $elemMatch: { _id: listOne.items[0]._id } }   })).toExist();
    });

    it("should not remove a item from list if not a collaborator", function() {
      Meteor.server.method_handlers["groceryLists.removeItem"].apply(
        { userId: 'randomId' },
        [listOne._id, listOne.items[0]._id]
      );

      expect(GroceryLists.findOne({ _id: listOne._id, items: { $elemMatch: { _id: listOne.items[0]._id } }   })).toExist();
    });


  });
}