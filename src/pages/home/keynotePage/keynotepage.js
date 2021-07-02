import React, { Component } from 'react';
import { connect } from 'react-redux';
import './keynotePage.scss';
import { getConferenceForHomePage } from '../../../actions/conferenceActions';
import KeyNotePerson from './keynotePerson';

class KeyNotePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conference: []
    }
  }

  componentDidMount() {
    this.props.getConferenceForHomePage();
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.homepageconference !== nextProps.homepageconference) {
      this.setState({ conference: nextProps.homepageconference }, () => {
        console.log('dddd', this.state.conference)
      });
    }
  }

  render() {
    return (
      <div>
        <div className="keynote-page-section">
          <h1 className="text-center keynote-header">Keynotes</h1>
          <p className="text-center text-light nav-text">home/keynotes</p>
        </div>
        <div className="container">
          {this.props.homepageconference && this.props.homepageconference[0].resource &&
            this.props.homepageconference[0].resource.resourcepersons && 
            this.props.homepageconference[0].resource.resourcepersons.map((person, index) => (
              <div key={index}>
                <KeyNotePerson person={person} />
              </div>
            ))}
        </div>
      </div>
    );
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
export default connect(mapStateToProps,mapDispatchToProps)(KeyNotePage);