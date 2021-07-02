import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import './conferencePage.scss';

class Conference extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="card custom-card mb-3">
          <div className="bg-image hover-overlay">
            <img
              src={this.props.conference.image_url}
              className="img-fluid conference-img"
            />
          </div>
          <div className="card-body">
            <h5 className="conference-card-title">{this.props.conference.name}</h5>
            <p className="conference-custom-time"><i className="fas fa-clock"></i>&nbsp;&nbsp;{this.props.conference.resource && this.props.conference.resource.time}</p>
            <p className="conference-custom-time"><i className="fas fa-map-pin"></i>&nbsp;&nbsp;{this.props.conference.resource && this.props.conference.resource.venue}</p>
            <p className="d-inline conference-resource-person">Resource Persons</p>
            <AvatarGroup max={6} className="mt-1 mb-2">
              {this.props.conference.resource && this.props.conference.resource.resourcepersons &&
                this.props.conference.resource.resourcepersons.map((person, index) => (
                  <Avatar src={person.imageurl} key={index} alt={person.firstname}  />
                ))}
            </AvatarGroup>
            <div className="d-flex justify-content-center">
              <a href="#!" className="btn btn-lg btn-color btn--pill">reserve a ticket</a>
            </div>
          </div>
        </div>  
      </div>
    );
  }
}

export default Conference;