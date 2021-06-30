import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getConferencesForAdmin } from '../../../actions/conferenceActions';
import { getAllWorkshops } from '../../../actions/workshopActions';
import { getAllUsers } from '../../../actions/userActions';
import './dashboard.scss';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confernces: [],
      workshops: [],
      users: []
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token') !== null && localStorage.getItem('role') === 'ROLE_ADMIN') {
      this.props.getConferencesForAdmin();
      this.props.getAllWorkshops();
      this.props.getAllUsers();
    }
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.conference !== nextProps.conference) {
      this.setState({ confernces: nextProps.conference });
    }

    if (this.props.workshops !== nextProps.workshops) {
      this.setState({ workshops: nextProps.workshops });
    }

    if (this.props.users !== nextProps.users) {
      this.setState({ users: nextProps.users });
    }
  }

  render() {
    return (
      <div className="card p-3 summary-body">
        <div className="mb-2">
          <h4 className="d-inline summary-header">REACH Summary</h4>
          &nbsp;&nbsp;<i className="fas fa-thermometer-three-quarters fa-lg"></i>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="border p-3 mb-3">
              <i className="fas fa-chalkboard-teacher fa-2x d-inline"></i>&nbsp;
              <h3 className="d-inline summary-data">Conferences</h3>
              <div className="d-flex justify-content-center">
                <h1 className="summary-item">{this.state.confernces ? this.state.confernces.length : 0}</h1>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="border p-3 mb-3">
              <i className="fas fa-flask fa-2x d-inline"></i>&nbsp;
              <h3 className="d-inline summary-data">Workshops</h3>
              <div className="d-flex justify-content-center">
                <h1 className="summary-item">{this.state.workshops ? this.state.workshops.length : 0}</h1>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="border p-3 mb-3">
              <i className="fas fa-users fa-2x d-inline"></i>&nbsp;
              <h3 className="d-inline summary-data">Users</h3>
              <div className="d-flex justify-content-center">
                <h1 className="summary-item">{this.state.users ? this.state.users.length : 0}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  conference: state.conferenceReducer.getadminconferences,
  workshops: state.workshopReducer.allWorkshops,
  users: state.userReducer.getallusers
});

const mapDispatchToProps = dispatch =>({
  getConferencesForAdmin: () => {
    dispatch(getConferencesForAdmin());
  },
  getAllWorkshops: () => {
    dispatch(getAllWorkshops());
  },
  getAllUsers: () => {
    dispatch(getAllUsers());
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(Summary);

