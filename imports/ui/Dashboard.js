import React from "react";
import PrivateHeader from "./PrivateHeader";
import GroceryListComponent from "./GroceryListComponent";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <PrivateHeader title="Your boilerPlate code" />
        <div>
          <GroceryListComponent />
        </div>
      </div>
    );
  }
}
