import React from "react";
import { Meteor } from 'meteor/meteor';
import { createContainer } from "meteor/react-meteor-data";
import ModalUserBox from './ModalUserBox';

export class ModalContent extends React.Component {
  render(){
    let isOwner;
    const currentUser = Meteor.userId();

    if( this.props.list.userId === currentUser){
      isOwner = (
        <div>
          <div className="modal-header">
            <h2>Choose a User to share your list</h2>
          </div>
          <div className="modal-body">
            {this.props.listUser.map((user, index) => {
              return (
                  <ModalUserBox key={index} user={user} list={this.props.list}/>
                )
              })}
          </div>
        </div>
      )
    } else {
      isOwner = (
        <h3>You are not allowed to add collaborators to this list</h3>
      )
    }
    return (
      <div>
        <div className="modal">
          {isOwner}   
        </div>
      </div>
    );
  }
};

ModalContent.propTypes = {
  list: React.PropTypes.object.isRequired,
  listUser: React.PropTypes.array.isRequired
 };

 export default createContainer(() => {
  Meteor.subscribe('userList');

  return {
    listUser: Meteor.users.find().fetch(),
    }
}, ModalContent);