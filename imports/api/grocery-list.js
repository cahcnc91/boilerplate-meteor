import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

export const GroceryLists = new Mongo.Collection("groceryLists");

if (Meteor.isServer) {
  Meteor.publish("groceryLists", function() {
    return GroceryLists.find({
      $or: [
        { userId: this.userId },
        { collaborator: { $elemMatch: { collaboratorId: this.userId } } }
      ]
    });
  });
}

Meteor.methods({
  "groceryLists.insert"(listName) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    new SimpleSchema({
      listName: {
        type: String,
        required: true
      }
    }).validate({ listName });

    return GroceryLists.insert({
      listName,
      userId: this.userId,
      items: [],
      collaborator: [],
      lastUpdated: new Date().getTime()
    });
  },

  //REMOVE LIST
  "groceryLists.remove"(_id) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    GroceryLists.remove({ _id, userId: this.userId });
  },

  //REMOVE ITEM
  "groceryLists.removeItem"(_id, item) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    GroceryLists.update(
      {
        _id,
        userId: this.userId
      },
      {
        $pull: {
          items: {
            _id: item
          }
        },
        $set: {
          lastUpdated: new Date().getTime()
        }
      }
    );
  },

  //UPDATE LIST, ADD ITEM
  "groceryLists.update"(_id, item) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({
      _id
    });

    GroceryLists.update(
      {
        _id,
        userId: this.userId
      },
      {
        $push: {
          items: {
            _id: new Meteor.Collection.ObjectID(),
            name: item,
            checked: false
          }
        },
        $set: {
          lastUpdated: new Date().getTime()
        }
      }
    );
  },

  //UPDATE LIST, ADD COLLABORATOR
  "groceryLists.updateUsers"(_id, collaboratorId) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    GroceryLists.update(
      {
        _id,
        userId: this.userId
      },
      {
        $push: {
          collaborator: {
            collaboratorId: collaboratorId
          }
        },
        $set: {
          lastUpdated: new Date().getTime()
        }
      }
    );
  },

  //UPDATE ITEM, CHANGE CHECKED STATE
  "groceryLists.updateItem"(_id, itemId, isChecked) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    GroceryLists.update(
      {
        $and: [
          { _id: _id },
          { items: { $elemMatch: { _id: itemId } } }
        ]
      },
      { $set: { "items.$.checked": isChecked, "lastUpdated": new Date().getTime()}}
    );
  }

});
