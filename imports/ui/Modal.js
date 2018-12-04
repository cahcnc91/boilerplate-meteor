import React from "react";
import { Meteor } from 'meteor/meteor';
import { createContainer } from "meteor/react-meteor-data";

export class Modal extends React.Component {
  render(){
    return (
      <div className="">
  
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
          Share List
        </button>
  
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
            
              <div className="modal-header">
                <h4 className="modal-title">Choose User to share list</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              
              <div className="modal-body">
                <div className="checkbox">
                  {this.props.listUser.map((user, index) => {
                    return (
                      <div key={index}>
                        <input type="checkbox" value="" />
                        {user.emails[0].address}
                      </div>
                    )
                  })}
                  
                </div>

              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
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
    listUser: Meteor.users.find().fetch()
    }
}, Modal);