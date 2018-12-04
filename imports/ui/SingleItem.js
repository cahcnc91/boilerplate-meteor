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

    console.log(isChecked)
    props.call('groceryLists.updateItem', props.list._id, props.item._id, isChecked);

  }

  return (
    <div>
      <div className="checkbox">
        <input type="checkbox" checked={props.item.checked} onChange={handleCheck}/>
          {props.item.name} <span> <button onClick={handleRemove}>X</button> </span>
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