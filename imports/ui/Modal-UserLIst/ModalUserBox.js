import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";

export class ModalUserBox extends React.Component {

  onSubmit = () => {
    this.props.call('groceryLists.updateUsers', this.props.list._id, this.props.user._id);
  }

  render () {
    return (
      <div className="modal-item">
        <div className="edit__items">
          <p>{this.props.user.emails[0].address}</p>
          <div>
            <ion-icon name="add-circle" onClick={this.onSubmit.bind(this)} size="large" className="button-icon-modal"></ion-icon>
          </div>
        </div>
      </div>  
    );
  }
 
}

ModalUserBox.propTypes = {
  user: React.PropTypes.object.isRequired,
  call: React.PropTypes.func.isRequired,
  list: React.PropTypes.object.isRequired
 };

export default createContainer(() => {
  return {
    call: Meteor.call
  };
}, ModalUserBox);