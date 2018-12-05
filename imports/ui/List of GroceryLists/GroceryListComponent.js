import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from "meteor/react-meteor-data";
import SingleListItem from "../List of Items/SingleListItem";
import { Session } from 'meteor/session';

import  { GroceryLists } from "../../api/grocery-list";
import GroceryListHeader from "./GroceryListHeader";
import EmptyList from '../EmptyList';

export const GroceryListComponent = (props) => {
    return (
      <div className="list-of-lists">
        <GroceryListHeader />
        
        <div className="list-item">
          {props.lists.length === 0? <EmptyList /> : undefined}
          { props.lists.map(list => {
            return <SingleListItem key={list._id} list={list}/>;
          })}
        </div>
      </div>
    );

};

GroceryListComponent.propTypes = {
 lists: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedListId = Session.get('selectedListId');

  Meteor.subscribe('groceryLists');

  return {
    lists: GroceryLists.find().fetch().map(list => {
      return {
        ...list,
        selected: list._id === selectedListId
      };
    })
  };
}, GroceryListComponent);

