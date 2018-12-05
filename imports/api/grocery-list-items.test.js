import { Meteor } from "meteor/meteor";
var expect = require("expect");

import { GroceryLists } from "./grocery-list";

if (Meteor.isServer) {
  describe("groceryLists-items", function() {
    const listOne = {
      _id: 'testListId1',
      listName: "tests list name 1",
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

    it("should update list and add item if owner", function() {
      const item = "cake";

      Meteor.server.method_handlers["groceryLists.update"].apply(
        {
          userId: listOne.userId
        },
        [listOne._id,  item ]
      );

      const list = GroceryLists.findOne(listOne._id);
      expect(list.items[1]).toContain({name: item});
    });

    it("should update list and add item if collaborator", function() {
      const item = "cake";

      Meteor.server.method_handlers["groceryLists.update"].apply(
        {
          userId: listOne.collaborator[0]
        },
        [listOne._id,  item ]
      );

      const list = GroceryLists.findOne(listOne._id);
      expect(list.items[1]).toContain({name: item});
    });

    it("should not update list if user is not creator or collaborator", function() {
      const item = "cake";
      Meteor.server.method_handlers["groceryLists.update"].apply(
        {
          userId: 'ramdonId'
        },
        [listOne._id,  item ]
      );

      const list = GroceryLists.findOne(listOne._id);
      expect(list.items[1]).toNotExist();
      expect(list.items.length).toBe(1);
    });

    it("should not update list if not authenticated", function() {
      const item = "banana";
      expect(() => {
        Meteor.server.method_handlers["groceryLists.update"].apply({}, [
          listOne._id,
          { item }
        ]);
      }).toThrow();
    });

    it("should not update list if empty string as item", function() {
      const item = "";
      expect(() => {
        Meteor.server.method_handlers["groceryLists.update"].apply(
          {
            userId: listOne.collaborator[0]
          },
          [listOne._id, item ]
        );
      }).toThrow();
    });

    it("should update property checked if user is owner", function() {
      Meteor.server.method_handlers["groceryLists.updateItem"].apply(
        {
          userId: listOne.userId
        },
        [listOne._id, listOne.items[0]._id, true ]
      );

      const list = GroceryLists.findOne(listOne._id);
      expect(list.items[0].checked).toBe(true);
    });

    it("should update property checked if user is collaborator", function() {
      Meteor.server.method_handlers["groceryLists.updateItem"].apply(
        {
          userId: listOne.collaborator[0]
        },
        [listOne._id, listOne.items[0]._id, true ]
      );

      const list = GroceryLists.findOne(listOne._id);
      expect(list.items[0].checked).toBe(true);
    });

    it("should  not update property checked if user is not owner or collaborator", function() {
      Meteor.server.method_handlers["groceryLists.updateItem"].apply(
        {
          userId: 'randomId'
        },
        [listOne._id, listOne.items[0]._id, true ]
      );

      const list = GroceryLists.findOne(listOne._id);
      expect(list.items[0].checked).toBe(false);
    });


  });
}