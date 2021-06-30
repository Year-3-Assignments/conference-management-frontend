import React, { Component } from 'react';
import { connect } from 'react-redux';
import './dashboard.scss';
import Overview from './overview';
import Summary from './summary';
import ConferenceSummary from './conferenceSummary';
import UserPayments from './payments';
import AdminNotifications from './notifications';
import RoleChangeRequests from './roleChangeRequests';

class DashBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container p-4">
        {localStorage.getItem('role') === 'ROLE_ADMIN' ?
          <div>
            <div className="row">
              <div className="col-md-4 col-sm-12 col-lg-4">
                <Overview />
              </div>
              <div className="col-md-7 col-sm-12 col-lg-8">
                <Summary />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-7">
                <ConferenceSummary />
                <AdminNotifications />
              </div>
              <div className="col-md-5">
                <UserPayments />
                <RoleChangeRequests />
              </div>
            </div>
          </div>
        :
          window.location = '/login'
        }
      </div>
    );
  }
}

const mapStateToProps = state =>({

});

const mapDispatchToProps = dispatch =>({

})
export default connect(mapStateToProps,mapDispatchToProps)(DashBoard);
