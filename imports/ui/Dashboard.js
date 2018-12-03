import React from "react";
import PrivateHeader from "./PrivateHeader";
import GroceryListComponent from "./GroceryListComponent";
import Editor from './Editor';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <PrivateHeader title="Your boilerPlate code" />
        <div>
          <GroceryListComponent />
          <Editor/>
        </div>
      </div>
    );
  }
}
