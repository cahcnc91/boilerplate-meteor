import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import { Meteor } from "meteor/meteor";
import { browserHistory } from "react-router";
import moment from "moment";

import { GroceryLists } from "../../api/grocery-list";
import { ListOfItems } from "../List of Items/ListOfItems";
import ModalContent from "../Modal-UserLIst/ModalContent";
import Modal from "react-modal";

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      error: null
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const item = this.refs.item.value.trim();
    if (item === ""){
      return this.setState({error: 'Please add text to add item.'})
    }
    this.props.call("groceryLists.update", this.props.list._id, item);
    this.setState({error: null})
    this.refs.item.value = "";
  }

  handleDelete() {
    this.props.call("groceryLists.remove", this.props.list._id);
    this.props.browserHistory.push("/dashboard");
  }

  render() {
    let errorP;

    if (this.state.error) {
      errorP = (<p>{this.state.error}</p>)
    } else {
      errorP = null;
    }

    if (this.props.list) {
      const items = this.props.list.items;
      return (
        <div className="editor">
          <div className="editor__title">
            <h2>{this.props.list.listName}</h2>
            <p><small><i>Last updated {moment(this.props.list.lastUpdated).fromNow()}</i></small></p>
          </div>

          <div className="editor__add">
            <input className="item-field" type="text" ref="item" placeholder="Add Item" />
            <button className="button" onClick={this.onSubmit.bind(this)}>+</button>
            {errorP}
          </div>

          
          <ListOfItems items={items} list={this.props.list} />

          <div className="editor__buttons">
            <p>Total Items: {this.props.list.items.length}</p>
            <button
              className="button button--pill"
              onClick={this.handleDelete.bind(this)}
            >
              Delete List
            </button>
            <button className="button button--pill">Clear List</button>
            <button
              onClick={() => this.setState({ isOpen: true })}
              className="button button--pill"
            >
              Share List
            </button>
            <Modal
              isOpen={this.state.isOpen}
              contentLabel="Share list with users"
            >
              <ModalContent list={this.props.list} />
              <button
                onClick={() => this.setState({ isOpen: false })}
                className="button"
              >
                Close
              </button>
            </Modal>
          </div>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <div className="editor__message">
            <p>{this.props.selectedListId ? "List Not found" : "Choose a List"}</p>
          </div>
        </div>
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
