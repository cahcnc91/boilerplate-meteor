import React from "react";
import PrivateHeader from "./PrivateHeader";
import GroceryListComponent from "./List of GroceryLists/GroceryListComponent";
import Editor from './Editor/Editor';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <PrivateHeader title="GroceryListApp" />
        <div className="page-content">
          <div className="page-content__sidebar">
            <GroceryListComponent />
          </div>
          <div className="page-content__main">
            <Editor/>
          </div>
        </div>
      </div>
    );
  }
}
