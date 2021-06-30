import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getConferenceForHomePage } from '../../actions/conferenceActions';
import './homePage.scss'

class Conference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conference: ''
    }
  }

  componentDidMount() {
    this.props.getConferenceForHomePage();
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.homepageconference !== nextProps.homepageconference) {
      this.setState({ conference: nextProps.homepageconference });
    }
  }

  render() {
    return (
      <div>
        {this.state.conference && this.state.conference.length > 0 && this.state.conference.map((conference) => (
          <div key={conference._id} className="text-center conference-section">
            <div>
            <div className="conference-title">{conference.name}</div>
              <p className="conference-description">{conference.description}</p>
              <p className="conference-place">@ {conference.resource.venue}</p>
              <p className="conference-time">{conference.resource.time}</p>
              <button className="btn btn-primary btn--pill button">BOOK A TICKET NOW</button>
            </div>
          </div>
        ))}
        <div className="conduct">
          <h1 className="text-center conduct-title">Conducted By</h1>
          {this.state.conference && this.state.conference.length > 0 && this.state.conference.map((conference) => (
            <div key={conference._id} className="text-center">
              <div className="row">
                {conference.resource.resourcepersons && conference.resource.resourcepersons.map((person) => (
                  <div key={person._id} className="mb-3 col-md-6">
                    <div className="d-block justify-content-center">
                      <img src={person.imageurl} className="conference-person-img" />
                      <h1 className="person-name">{person.firstname}&nbsp;&nbsp;{person.lastname}</h1>
                      <p className="person-description">{person.description}</p>
                      <p className="person-phonenumber">{person.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="cover">
          <div className="conduct-description">
            <h1 className="text-center description-title">You Will Get</h1>
            {this.state.conference && this.state.conference.length > 0 && this.state.conference.map((conference) => (
              <div key={conference._id} className="text-center">
                <p className="description">{conference.resource && conference.resource.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container pt-5">
          <h1 className="text-center conduct-title">Contact Us For More</h1>
          <div className="row m-0 mb-2">
            <label htmlFor="email" className="form-label p-0 contact-us">Full Name</label>
            <input type="text" id="email" className="form-control" name="email" placeholder="Enter your full name" />
          </div>
          <div className="row m-0 mb-2">
            <label htmlFor="email" className="form-label p-0 contact-us">Email Address</label>
            <input type="text" id="email" className="form-control" name="email" placeholder="Enter your email address" />
          </div>
          <div className="row m-0 mb-2">
            <label htmlFor="email" className="form-label p-0 contact-us">Phone Number</label>
            <input type="text" id="email" className="form-control" name="email" placeholder="Enter your phone number" />
          </div>
          <div className="row m-0 mb-3">
            <label htmlFor="desctiption" className="form-label p-0 contact-us">Message</label>
            <textarea type="desctiption" rows="6" id="desctiption" className="form-control" name="desctiption" />
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn--pill btn-primary mb-4 button">SEND MESSAGE</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state =>({
  homepageconference: state.conferenceReducer.homepageconference
});

const mapDispatchToProps = dispatch =>({
  getConferenceForHomePage: () => {
    dispatch(getConferenceForHomePage());
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(Conference);