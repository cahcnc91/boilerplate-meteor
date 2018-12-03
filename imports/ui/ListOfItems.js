import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from "meteor/react-meteor-data";

import { SingleItem } from './SingleItem';


export const ListOfItems = (props) => {
  return (
      <div>
        Items {props.items.length}

        {props.items.map((item, index) => {
          return <SingleItem key={index} item={item}/>;
        })}
      </div>
    );

};

ListOfItems.propTypes = {
 items: React.PropTypes.array.isRequired
};
