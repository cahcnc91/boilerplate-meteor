import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

export class GroceryListHeader extends React.Component {
  
  onAdd (e) {
    e.preventDefault();
    console.log('cliked')
    
    const listName = this.refs.listName.value.trim();
    if (listName.length === 0) {
      return 'Not authorized'
    }
    this.props.meteorCall('groceryLists.insert', listName);
    this.refs.listName.value = "";
  }

  render () {
    return (
      <div className="add-bar">
          <input className="item-field" type="text" ref="listName" name="listName" placeholder="New List" />
          <button className="button" onClick={this.onAdd.bind(this)}>+</button>
      </div>
    );
  }
  
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, GroceryListHeader);
