import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import { Meteor } from "meteor/meteor";
import { browserHistory } from 'react-router';

import { GroceryLists } from "../api/grocery-list";
import { ListOfItems } from './ListOfItems';
import  Modal from './Modal';

export class Editor extends React.Component {

  onSubmit(e) {
    e.preventDefault();
    
    const item = this.refs.item.value.trim();
    this.props.call("groceryLists.update", this.props.list._id, item);
    this.refs.item.value = "";
  }

  handleDelete (){
    this.props.call('groceryLists.remove', this.props.list._id);
    this.props.browserHistory.push('/dashboard');
  }

  render() {
    if (this.props.list) {
      const items = this.props.list.items;
      return (
        <div className="item-list">
          <form onSubmit={this.onSubmit.bind(this)}>
            <input type="text" ref="item" placeholder="Item new Item"/>
            <button>+</button>
          </form>
          <ListOfItems items={items} list={this.props.list}/>
          <div>
            <button onClick={this.handleDelete.bind(this)}>Delete List</button>
            <button>Clear List</button>
            <Modal list={this.props.list}/>
          </div>
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
  selectedListId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedListId = Session.get("selectedListId");

  return {
    selectedListId,
    list: GroceryLists.findOne(selectedListId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);

