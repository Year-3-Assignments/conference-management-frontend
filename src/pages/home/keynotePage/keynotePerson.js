import React, { Component } from 'react';
import './keynotePage.scss';

class KeyNotePerson extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="text-center mb-5 mt-5">
        <h1 className="keynote-name">{this.props.person.firstname}&nbsp;&nbsp;{this.props.person.lastname}</h1>
        <img src={this.props.person.imageurl} className="keynote-img" />
        <h3 className="keynote-speaker">Keynote Speaker</h3>
        <p className="keynote-email d-inline"><i className="fas fa-envelope"></i>&nbsp;&nbsp;{this.props.person.email}</p>&nbsp;&nbsp;&nbsp;&nbsp;
        <p className="keynote-phonenumber d-inline"><i className="fas fa-phone"></i>&nbsp;&nbsp;{this.props.person.phonenumber}</p>
        <p className="keynote-description">{this.props.person.description}</p>
      </div>
    );
  }
}

export default KeyNotePerson;