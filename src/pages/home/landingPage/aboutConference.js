import React, { Component } from 'react';
import { connect } from 'react-redux';
import './homePage.scss';
import firebase from '../../../firebase.config';

class AbouteConference extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mt-4 mb-4 about-conterence-section">
        <h1 className="about-conference-title text-center">About Conference</h1>
        <h3 className="about-name-title text-center">{this.props.conference[0] && this.props.conference[0].name}</h3>
        <p className="about-conference-description text-center">
          {this.props.conference[0] && this.props.conference[0].description}
        </p>
        <p className="about-conference-date text-center">
          {this.props.conference[0] && this.props.conference[0].resource.time} at&nbsp;
          {this.props.conference[0] && this.props.conference[0].resource.venue}
        </p>
        <div className="d-flex  justify-content-center">
          <p className="about-douments mt-2 badge bg-warning rounded-pill">
            Download Conference Doucuments
          </p>
        </div>
        <div className="text-center mt-2">
          {this.props.conference[0] && this.props.conference[0].resource &&
            this.props.conference[0].resource.resourceurls && 
            this.props.conference[0].resource.resourceurls.map((doc, index) => (
              <div className="documents" key={index}>
                <i className="fas fa-file-alt"></i>&nbsp;&nbsp;<a href={doc} className="documents" target="_blank">{firebase.storage().refFromURL(doc).name}</a>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  conference: state.conferenceReducer.homepageconference
});

const mapDispatchToProps = dispatch =>({

})
export default connect(mapStateToProps,mapDispatchToProps)(AbouteConference);