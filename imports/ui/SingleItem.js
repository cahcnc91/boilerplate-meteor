import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const SingleItem = (props) => {
  return (
    <div>
      {props.item.name}
    </div>
  );
}

SingleItem.propTypes = {
  item: React.PropTypes.object.isRequired,
}