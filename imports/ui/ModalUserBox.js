import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";

export class ModalUserBox extends React.Component {

  onSubmit = () => {
    console.log(this.props.list._id, this.props.user._id )
    this.props.call('groceryLists.updateUsers', this.props.list._id, this.props.user._id);
  }

  render () {
    return (
      <div>
          {this.props.user.emails[0].address}
          <button onClick={this.onSubmit.bind(this)}>+</button>
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