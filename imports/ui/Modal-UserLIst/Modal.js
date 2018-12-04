import React from "react";
import { Meteor } from 'meteor/meteor';
import { createContainer } from "meteor/react-meteor-data";
import ModalUserBox from './ModalUserBox';

export class Modal extends React.Component {

  render(){
    return (
      <div className="">
  
        <button type="button" className="button button--pill" data-toggle="modal" data-target="#myModal">
          Share List
        </button>
  
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
            
              <div className="modal-header">
                <h2 className="modal-title">Choose a User to share your list</h2>
                <button type="button" className="button button--pill" data-dismiss="modal">&times;</button>
              </div>
              
                <div className="modal-body">

                    <div className="checkbox">
                      {this.props.listUser.map((user, index) => {
                        return (
                          <ModalUserBox key={index} user={user} list={this.props.list}/>
                        )
                      })}
                    </div>
                </div>
              
                <div className="modal-footer">
                  <button type="button" className="button" data-dismiss="modal">Close</button>
                </div>

              
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Modal.propTypes = {
  list: React.PropTypes.object.isRequired,
  listUser: React.PropTypes.array.isRequired
 };

 export default createContainer(() => {
  Meteor.subscribe('userList');

  return {
    listUser: Meteor.users.find().fetch(),
    }
}, Modal);