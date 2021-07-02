import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getConferenceForHomePage, getApprovedConferences } from '../../../actions/conferenceActions';
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
    this.props.getApprovedConferences();
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
            <div className="conference-title" data-aos="fade-right" data-aos-duration="700">{conference.name}</div>
              <p className="conference-time">{conference.resource.time}</p>
              <p className="conference-place">@ {conference.resource.venue}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state =>({
  homepageconference: state.conferenceReducer.homepageconference,
  approvedconferences: state.conferenceReducer.approvedconferences
});

const mapDispatchToProps = dispatch =>({
  getConferenceForHomePage: () => {
    dispatch(getConferenceForHomePage());
  },
  getApprovedConferences: () => {
    dispatch(getApprovedConferences());
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(Conference);