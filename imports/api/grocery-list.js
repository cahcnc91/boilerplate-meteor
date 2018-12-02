import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import SimpleSchema from "simpl-schema";

export const GroceryLists = new Mongo.Collection("groceryLists");

if(Meteor.isServer){
  Meteor.publish('groceryLists', function () {
    return GroceryLists.find({ userId: this.userId });
  });
}

Meteor.methods({
  "groceryLists.insert"(listName) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    return GroceryLists.insert({
      listName,
      adminUserId: this.userId
      //updatedAt: moment().valueOf()  //new Date().getTime()
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

  "groceryLists.update"(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      listName: {
        type: String,
        min: 1
      }
    }).validate({
      _id,
      ...updates
    });

    GroceryLists.update({
      _id, 
      userId: this.userId
    }, {
      $set: {
        ...updates
      }
    });

  }
});
