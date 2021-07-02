import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../keynotePage/keynotePage.scss'
import { getApprovedConferences } from '../../../actions/conferenceActions';
import Conference from './conference';

class ConferencePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences: []
    }
  }

  componentDidMount() {
    this.props.getApprovedConferences();
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.approvedconferences !== nextProps.approvedconferences) {
      this.setState({ conferences: nextProps.approvedconferences }, () => {
        console.log('data', this.state.conferences)
      });
    }
  }

  render() {
    return (
      <div>
        <div className="keynote-page-section">
          <h1 className="text-center keynote-header">Conferences</h1>
          <p className="text-center text-light nav-text">home/conferences</p>
        </div>
        <div className="container mt-5">
          <div className="row">
            {this.state.conferences && this.state.conferences.map((item, index) => (
              <div key={index} className="col-md-4">
                <Conference conference={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  approvedconferences: state.conferenceReducer.approvedconferences
});

const mapDispatchToProps = dispatch =>({
  getApprovedConferences: () => {
    dispatch(getApprovedConferences());
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(ConferencePage);