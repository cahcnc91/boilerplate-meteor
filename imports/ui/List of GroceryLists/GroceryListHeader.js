import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

export class GroceryListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  onAdd(e) {
    e.preventDefault();

    const listName = this.refs.listName.value.trim();
    if (listName.length === 0) {
      return this.setState({ error: "Please add text to add List." });
    }

    this.props.meteorCall("groceryLists.insert", listName);
    this.refs.listName.value = "";
    this.setState({ error: null });
  }

  render() {
    let errorP;

    if (this.state.error) {
      errorP = <p className="header-p">{this.state.error}</p>;
    } else {
      errorP = null;
    }

    return (
        <div className="add-bar">

            <input
              className="item-field"
              type="text"
              ref="listName"
              name="listName"
              placeholder="New List"
            />

          <button className="button" onClick={this.onAdd.bind(this)}>
            +
          </button>
          {errorP}
        </div>
        
    );
  }
}

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, GroceryListHeader);
