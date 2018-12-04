import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';

export const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h2 className="header__title">{props.title}</h2>
        <button className="button button--link-text" onClick={() => props.handleLogout()}>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleLogout: React.PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout()
  };
}, PrivateHeader);

//export default PrivateHeader;
