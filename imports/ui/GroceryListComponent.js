import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from "meteor/react-meteor-data";
import SingleListItem from "./SingleListItem";

import  { GroceryLists } from "../api/grocery-list";
import GroceryListHeader from "./GroceryListHeader";

export class GroceryListComponent extends React.Component   {
  render (){
    console.log(this.props.lists)
    return (
      <div>
        <GroceryListHeader />
        List {this.props.lists.length}

        { this.props.lists.map(groceryList => {
          return <SingleListItem key={groceryList._id} groceryList={groceryList}/>;
        })}
      </div>
    );
  }

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

