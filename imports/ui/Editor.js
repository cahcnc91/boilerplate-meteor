import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import { Meteor } from "meteor/meteor";

import { GroceryLists } from "../api/grocery-list";
import { ListOfItems } from './ListOfItems';

export class Editor extends React.Component {
  onSubmit(e) {

    e.preventDefault();
    
    const item = this.refs.item.value.trim();
    this.props.call("groceryLists.update", this.props.list._id, item);
    this.refs.item.value = "";
  }

  render() {
    if (this.props.list) {
      const items = this.props.list.items;
      return (
        <div>
          <form onSubmit={this.onSubmit.bind(this)}>
            <input type="text" ref="item" placeholder="Item new Item"/>
            <button>+</button>
          </form>
          <ListOfItems items={items}/>
          <button>Delete List</button>
        </div>
      );
    } else {
      return (
        <p>{this.props.selectedListId ? "List Not found" : "Choose a List"}</p>
      );
    }

    return <div>Editor of list</div>;
  }
}

Editor.propTypes = {
  list: React.PropTypes.object,
  selectedListId: React.PropTypes.string
};

export default createContainer(() => {
  const selectedListId = Session.get("selectedListId");

  return {
    selectedListId,
    list: GroceryLists.findOne(selectedListId),
    call: Meteor.call
  };
}, Editor);
