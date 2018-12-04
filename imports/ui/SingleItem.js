import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";


export const SingleItem = (props) => {
  handleRemove = () => {
    props.call('groceryLists.removeItem', props.list._id, props.item._id);
  }

  return (
    <div>
      <div className="checkbox">
        <input type="checkbox" value=""/>
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