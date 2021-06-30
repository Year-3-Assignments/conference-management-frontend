import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRequestUserRoles } from '../../../actions/userActions';
import RoleRequest from '../../../components/roleRequest/roleRequest';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class RoleChangeRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token') !== null) { 
      this.props.getRequestUserRoles();
    }
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.userroles !== nextProps.userroles) {
      this.setState({ requests: nextProps.userroles });
    }

    if (this.props.changeuserrole !== nextProps.changeuserrole) {
      this.props.getRequestUserRoles();
      NotificationManager.success('User role changed successfully')
    }
  }

  render() {
    return (
      <div className="card p-3 mt-4">
        <h3 className="payment-title">Role Change Requests</h3>
        {this.state.requests && this.state.requests.length > 0 ?
          <div>
            {this.state.requests.slice(0, 5).map((request, index) => (
              <div key={index}>
                <RoleRequest 
                  requestId={request._id}
                  requestedby={request.requestedby} 
                  requestrole={request.requestrole} 
                  message={request.message}
                  createdat={request.createdAt}
                />
              </div>
            ))}
          </div>
        :
          <div>
            <p className="badge rounded-pill bg-custom-light text-dark">CURRENTLY THERE ARN'T ANY</p>
          </div>
        }
        <NotificationContainer/> 
      </div>
    );
  }
}

const mapStateToProps = state =>({
  userroles: state.userReducer.getrequestuserroles,
  changeuserrole: state.userReducer.changeuserrole
});

const mapDispatchToProps = dispatch =>({
  getRequestUserRoles: () => {
    dispatch(getRequestUserRoles());
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(RoleChangeRequests);
