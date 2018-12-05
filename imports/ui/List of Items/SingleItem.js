import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";


export const SingleItem = (props) => {
  handleRemove = () => {
    props.call('groceryLists.removeItem', props.list._id, props.item._id);
  }

  handleCheck = () => {
    let isChecked;
    
    if (props.item.checked === false) {
      isChecked = true;
    } else {
      isChecked = false;
    }

    props.call('groceryLists.updateItem', props.list._id, props.item._id, isChecked);
  }

  return (
    <div className="edit__items">
      <div className="edit__items_name">
        <input type="checkbox" checked={props.item.checked} id={props.item._id} onChange={handleCheck} name={props.item._id} value={props.item.name}/>
        <label htmlFor={props.item._id}>{props.item.name}</label>
      </div>
      <div className="edit__button__remove">
        <button className="button--round" onClick={handleRemove}>X</button>
      </div>
    </div>
  );
}

SingleItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  list: React.PropTypes.object.isRequired,
  call: React.PropTypes.func.isRequired,
}

export default createContainer(() => {
  return {
    call: Meteor.call
  };
}, SingleItem);