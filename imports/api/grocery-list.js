import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

export const GroceryLists = new Mongo.Collection("groceryLists");

//PUBLICATION OF AVAILABLE LISTS
// lists for user if he created the list or if he is a collaborator
if (Meteor.isServer) {
  Meteor.publish("groceryLists", function() {
    return GroceryLists.find({
      $or: [
        { userId: this.userId },
        { collaborator: { $in: [this.userId] } }
      ]
    });
  });
}

//ADD A LIST 
//listName needs to be a string, listName is required, user needs to be signin 
Meteor.methods({
  "groceryLists.insert"(listName) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    new SimpleSchema({
      listName: {
        type: String,
        min: 1,
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
  // user needs to be creator of list
  "groceryLists.remove"(_id) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    GroceryLists.remove({ _id, userId: this.userId });
  },

  //REMOVE ITEM FROM LIST
  //user needs to be a collaborator or owner
  "groceryLists.removeItem"(_id, item) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }
    
    GroceryLists.update(
      {
        $or: [ 
          { _id: _id, userId: this.userId }, 
          {  _id: _id, collaborator: { $in: [this.userId] } } ]
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

  //UPDATE LIST - ADD ITEM
  // item needs to be a string with more than 1 character, is required,
  // user needs to be either owner or collaborator
  "groceryLists.update"(_id, item) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    new SimpleSchema({
      item: {
        type: String,
        min: 1,
        required: true
      }
    }).validate({
      item
    });

    GroceryLists.update(
      {
        $or: [ 
          { _id: _id, userId: this.userId }, 
          { _id: _id, collaborator: { $in: [this.userId] } } ]
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

  //UPDATE LIST - Clear all items
  // user needs to be either owner or collaborator
  "groceryLists.updateClear"(_id) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    GroceryLists.update(
      {
        $or: [ 
          { _id: _id, userId: this.userId }, 
          { _id: _id, collaborator: { $in: [this.userId] } } ]
      },
      {
        $set: {
          lastUpdated: new Date().getTime(),
          items: []
        }
      }
    );
  },

  //UPDATE LIST
  //add a collaborator, user needs to be the owner
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
          collaborator: collaboratorId
        },
        $set: {
          lastUpdated: new Date().getTime()
        }
      }
    );
  },

  //UPDATE ITEM, CHANGE CHECKED STATE
  //updates property check of each item, user nees to be a collaborator or owner
  "groceryLists.updateItem"(_id, itemId, isChecked) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    GroceryLists.update({
      $or: [
        { userId: this.userId },
        { collaborator: { $in: [this.userId] }}
      ],
      $and : [
        {_id: _id},
        {items: { $elemMatch: { _id: itemId } }}
      ]},
      { $set: { "items.$.checked": isChecked, "lastUpdated": new Date().getTime()}}
    );
  }
});

