import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const SingleListItem = (props) => {
  const className = props.list.selected ? 'item item--selected' : 'item';

  return (
    <div className={className} onClick={() => {
        props.Session.set('selectedListId', props.list._id);
      }}>
      <h4 className="item__title">{props.list.listName}</h4>
    </div>
  );
}

SingleListItem.propTypes = {
  list: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
}

export default createContainer(() => {
  return { Session };
}, SingleListItem);