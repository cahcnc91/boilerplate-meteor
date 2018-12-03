import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

export class GroceryListHeader extends React.Component {
  
  onSubmit (e) {
    e.preventDefault();
    
    const listName = this.refs.listName.value.trim();
    console.log(listName);

    if (listName.length === 0) {
      return 'Not authorized'
    }

    this.props.meteorCall('groceryLists.insert', listName);
    this.refs.listName.value = "";
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="listName" name="listName" placeholder="New List Name" />
          <button>+</button>
        </form>
      </div>
    );
  }
  
};

GroceryListHeader.propTypes = {
  meteorCall: React.propTypes.func.isRequired
}

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, GroceryListHeader);
