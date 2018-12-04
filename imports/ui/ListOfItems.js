import React from 'react';
import SingleItem from './SingleItem';

export const ListOfItems = (props) => {
  return (
      <div>
        Items {props.items.length}

        {props.items.map((item, index) => {
          return <SingleItem key={index} item={item} list ={props.list}/>;
        })}
      </div>
    );

};

ListOfItems.propTypes = {
 items: React.PropTypes.array.isRequired,
 list: React.PropTypes.object.isRequired
};
