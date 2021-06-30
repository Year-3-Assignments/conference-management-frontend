import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getConferencesForAdmin } from '../../../actions/conferenceActions';
import { getAllWorkshops } from '../../../actions/workshopActions';
import './dashboard.scss';
import LineChart from '../../../components/charts/lineChart';

class ConferenceSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences: [],
      workshops: []
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token') !== null && 
      localStorage.getItem('role') === 'ROLE_ADMIN' &&
      this.props.conference === null) {
      this.props.getConferencesForAdmin();
    }

    if (this.props.workshops === null) {
      this.props.getAllWorkshops();
    }
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.conference !== nextProps.conference) {
      this.setState({ conferences: nextProps.conference });
    }

    if (this.props.workshops !== nextProps.workshops) {
      this.setState({ workshops: nextProps.workshops });
    }
  }

  findMonth(dateString) {
    let date = new Date(dateString);
    return date.getMonth();
  }

  makeConferenceDateArray() {
    let monthCounts = new Array(12).fill(0);

    if (this.state.conferences.length > 0) {
      for (let conference of this.state.conferences) {
        const MONTH = parseInt(this.findMonth(conference.createdAt));
        monthCounts[MONTH] += 1;
      }
    } 
    return monthCounts;
  }

  makeWorkshopDateArray() {
    let monthCounts = new Array(12).fill(0);

    if (this.state.workshops && this.state.workshops.length > 0) {
      for (let workshop of this.state.workshops) {
        const MONTH = parseInt(this.findMonth(workshop.createdAt));
        monthCounts[MONTH] += 1;
      }
    }
    return monthCounts;
  }

  render() {
    return (
      <div className="card p-3">
        <LineChart 
          months={this.makeConferenceDateArray()} 
          workshopMonths={this.makeWorkshopDateArray()} 
        />
      </div>
    );
  }
}

const mapStateToProps = state =>({
  conference: state.conferenceReducer.getadminconferences,
  workshops: state.workshopReducer.allWorkshops,
});

const mapDispatchToProps = dispatch =>({
  getConferencesForAdmin: () => {
    dispatch(getConferencesForAdmin());
  },
  getAllWorkshops: () => {
    dispatch(getAllWorkshops());
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(ConferenceSummary);

