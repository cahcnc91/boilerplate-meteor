import React from "react";
import { Accounts } from "meteor/accounts-base";
import { createContainer } from "meteor/react-meteor-data";
import { Session } from "meteor/session";

export const PrivateHeader = props => {
  const icon = props.isNavOpen ? <ion-icon name="close" size="large"></ion-icon> : <ion-icon name="menu" size="large"></ion-icon>;

  console.log(props.isNavOpen)
  return (
    <div className="header">
      <div className="header__content">
        <div className="header__nav-toggle" onClick={props.handleNavToggle}>{icon}</div>
        <h2 className="header__title">{props.title}</h2>
        <button
          className="button button--link-text"
          onClick={() => props.handleLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleLogout: React.PropTypes.func.isRequired,
  isNavOpen: React.PropTypes.bool.isRequired,
  handleNavToggle: React.PropTypes.func.isRequire
};

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  };
}, PrivateHeader);

//export default PrivateHeader;
