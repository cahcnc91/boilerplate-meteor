import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from "meteor/react-meteor-data";
import SingleListItem from "./SingleListItem";

import  { GroceryLists } from "../api/grocery-list";
import GroceryListHeader from "./GroceryListHeader";

export const GroceryListComponent = (props) => {
    return (
      <div>
        <GroceryListHeader />
        List {props.lists.length}

        { props.lists.map(list => {
          return <SingleListItem key={list._id} list={list}/>;
        })}
      </div>
    );

};

GroceryListComponent.propTypes = {
 lists: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('groceryLists');

  return {
    lists: GroceryLists.find().fetch()
  };
}, GroceryListComponent);

