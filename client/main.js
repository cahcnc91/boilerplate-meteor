import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";
import { browserHistory } from "react-router";

import { routes, onAuthChange } from "../imports/routes/Routes";
import "../imports/startup/simple-schema-configuration";

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get("currentPagePrivacy");

  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
  const selectedListId = Session.get("selectedListId");
  Session.set("isNavOpen", false);

  if (selectedListId) {
    browserHistory.replace(`/dashboard/${selectedListId}`);
  }
});

Tracker.autorun(() => {
  const isNavOpen = Session.get("isNavOpen");

  document.body.classList.toggle("is-nav-open", isNavOpen);
});

Meteor.startup(() => {
  Session.set("selectedListId", undefined);
  Session.set("isNavOpen", false);
  ReactDOM.render(routes, document.getElementById("app"));
});
