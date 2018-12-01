import React from "react";
import PrivateHeader from "./PrivateHeader";
import { Meteor } from "meteor/meteor";

export default class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <PrivateHeader title="Your boilerPlate code" />
        <div>
          Dashboard page.
        </div>
      </div>
    );
  }
}
