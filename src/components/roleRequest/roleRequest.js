import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './roleRequest.scss';
import { approveChangeUserRole, rejectChangeUserRole } from '../../actions/userActions';

class RoleRequest extends Component {
  constructor(props) {
    super(props);
  }

  setApproveChangeRole(e) {
    if (this.props.requestedby._id !== null && this.props.requestrole !== null) {
      const approvalData = {
        userId: this.props.requestedby._id,
        role: this.props.requestrole,
        requestid: this.props.requestId
      };
      this.props.approveChangeUserRole(approvalData);
    }
  }

  setRejectChangeRole(e) {
    if (this.props.requestedby._id !== null) {
      const rejectData = {
        userId: this.props.requestedby._id
      };
      this.props.rejectChangeUserRole(rejectData);
    }
  }

  render() {
    return (
      <div className="border p-3">
        <div>
          <h6 className="role-request-title">Requested By</h6>
          <div className="role-request-info-container">
            <div className="role-request-info">
              <img src={this.props.requestedby.imageurl} className="role-request-img" />
            </div>
            <div className="role-request-info">
              <p className="badge rounded-pill bg-custom-light role-request-field text-dark">
                {this.props.requestedby.firstname}&nbsp;{this.props.requestedby.lastname}
              </p>
            </div>
            <div className="role-request-info">
              <p className="badge rounded-pill bg-custom-light role-request-field text-dark">
                {this.props.requestedby.email}
              </p>
            </div>
            <div className="role-request-info">
              <p className="badge rounded-pill bg-custom-light role-request-field text-dark">
                {this.props.requestedby.phonenumber}
              </p>
            </div>
          </div>
          <div className="role-request-info-container p-0 m-0">
            <div className="role-request-info">
              <p className="request-role text-dark">
                Requested role: {this.props.requestrole}
              </p>
            </div>
          </div>
          <div className="role-request-info-container p-0 m-0">
            <div className="role-request-info">
              <p className="request-role text-dark">
                {this.props.message}
              </p>
            </div>
          </div>
          <div className="role-request-info-container p-0 m-0">
            <div className="role-request-info mb-1">
              <p className="request-role text-dark">
                {moment(this.props.createdat).format('lll')}
              </p>
            </div>
            <div>
              <p className="btn btn-sm btn-success btn--pill approve" 
                onClick={e => this.setApproveChangeRole(e)}
              >
                <i className="fas fa-check"></i>&nbsp;&nbsp;&nbsp;APPROVE
              </p>
              <p className="btn btn-sm btn-danger btn--pill reject">
              <i className="fas fa-times"></i>&nbsp;&nbsp;&nbsp;REJECT
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({

});

const mapDispatchToProps = dispatch =>({
  approveChangeUserRole: (roleData) => {
    dispatch(approveChangeUserRole(roleData));
  },
  rejectChangeUserRole: (roleData) => {
    dispatch(rejectChangeUserRole(roleData));
  }
});
export default connect(mapStateToProps,mapDispatchToProps)(RoleRequest);