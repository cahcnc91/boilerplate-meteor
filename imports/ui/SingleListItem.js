import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const SingleListItem = (props) => {
  return (
    <div onClick={() => {
        props.Session.set('selectedListId', props.list._id);
      }}>
      <h4>{props.list.listName}</h4>
      { props.list.selected ? 'selected': undefined }
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