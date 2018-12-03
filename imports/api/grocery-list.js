import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

export const GroceryLists = new Mongo.Collection("groceryLists");

if(Meteor.isServer) {
  Meteor.publish('groceryLists', function () {
    return GroceryLists.find({ userId: this.userId});
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
      updatedAt: new Date().getTime()
    });
  },

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

  "groceryLists.update"(_id, item) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      item: {
        type: String,
        min: 1
      }
    }).validate({
      _id,
      item
    });

    GroceryLists.update({
      _id, 
      userId: this.userId
    }, {
      $push: {
        items: {name: item, checked: false}
      }
    });

  }
});
