import React, { Component } from 'react';
import './upcommingEvnet.scss';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup'

class UpCommingEvent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="card mb-3">
          <div className="bg-image hover-overlay">
            <img
              src={this.props.imageurl}
              className="img-fluid event-img"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{this.props.name}</h5>
            <h5 className="d-inline">Resource Persons</h5>
            <AvatarGroup max={6} className="mt-1 mb-2">
              {this.props.resource && this.props.resource.resourcepersons &&
                this.props.resource.resourcepersons.map((person, index) => (
                  <Avatar src={person.imageurl} key={index} alt={person.firstname}  />
                ))}
            </AvatarGroup>
            <a href="#!" className="btn btn-outline-primary btn--pill">reserve a ticket</a>
          </div>
        </div>
      </div>
    );
  }
}

export default UpCommingEvent;