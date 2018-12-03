import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";
import { Tracker } from "meteor/tracker";
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import { routes, onAuthChange } from "../imports/routes/Routes";
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
  const selectedListId = Session.get('selectedListId');

  if(selectedListId) {
    browserHistory.replace(`/dashboard/${selectedListId}`)
  }
});

Meteor.startup(() => {
  Session.set('selectedListId', undefined);
  ReactDOM.render(routes, document.getElementById("app"));
});
