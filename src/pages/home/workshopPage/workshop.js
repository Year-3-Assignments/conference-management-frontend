import React, { Component } from 'react';
import './workshopPage.scss'
import firebase from '../../../firebase.config';
import moment from 'moment';

class Workshop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card p-3 mt-4 mb-4">
        <div>
        <h2 className="worshop-title">{this.props.workshop.name}</h2>
        <p className="m-0 badge rounded-pill bg-warning text-dark">{this.props.workshop._id}</p>
        <div className="row mt-4">
          {this.props.workshop.resource && this.props.workshop.resource.resourcepersons &&
            this.props.workshop.resource.resourcepersons.map((person, index) => (
              <div className="col-md-3 col-sm-6 text-center">
                <img src={person.imageurl} className="workshop-person-img" />
                <p className="workshop-person-name">{person.firstname}&nbsp;&nbsp;{person.lastname}</p>
                <p className="workshop-person-data">{person.email}</p>
                <p className="workshop-person-data">{person.phonenumber}</p>
              </div>
            ))}
        </div>
        <div className="row mt-3 text-dark">
          <div className="col-md-6">
            <p className="workshop-data"><i className="fas fa-map-pin"></i>&nbsp;&nbsp;<strong>Location</strong> : {this.props.workshop.resource.venue}</p>
            <p className="workshop-data"><i className="fas fa-clock"></i>&nbsp;&nbsp;<strong>Date & Time</strong> : {this.props.workshop.resource.time}</p>
            <p className="workshop-data"><i className="fas fa-file-alt"></i>&nbsp;&nbsp;<strong>Available Documents</strong></p>
            {this.props.workshop.resource.resourceurls && this.props.workshop.resource.resourceurls.map((url, index) => (
              <div key={index}> 
                <i className="fas fa-file-alt"></i>&nbsp;&nbsp;<a href={url} target="_blank" className="workshop-data">{firebase.storage().refFromURL(url).name}</a>
              </div>
            ))}
          </div>
          <div className="col-md-6 workshop-data">
            <i className="fas fa-align-left"></i>&nbsp;&nbsp;{this.props.workshop.description}
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Workshop;