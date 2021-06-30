import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserAccount } from '../../../actions/userActions';
import './dashboard.scss';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '...',
			lastName: '...',
			userName: '...',
			email: '...',
			phoneNumber: '...',
			profilePicture: '',
			isLoading: false
    }
  }

	componentDidMount() {
		if (localStorage.getItem('token') !== null) {
			this.setState({ isLoading: true }, () => {
				this.props.getUserAccount();
			});
		}
	}

	componentWillReceiveProps = nextProps => {
		if (this.props.getuser !== nextProps.getuser) {
			this.setState({
				isLoading: false,
				firstName: nextProps.getuser.firstname,
				lastName: nextProps.getuser.lastname,
				userName: nextProps.getuser.username,
				email: nextProps.getuser.email,
				phoneNumber: nextProps.getuser.phonenumber,
				profilePicture: nextProps.getuser.imageurl
			});
		}
	}

  render() {
    return (
      <div className="card p-3">
				{!this.state.isLoading ?
					<div>
						<div className="admin-info-container">
							<div className="admin-info">
								<img src={this.state.profilePicture} className="admin-profile-img" alt="admin-profile-page" />
							</div>
							<div className="admin-info admin-name">
								<h3 className="m-0 name">{this.state.firstName}&nbsp;{this.state.lastName}</h3>
								<p className="admin-username m-0">{this.state.userName}</p>
							</div>
						</div>
						<hr/>
						<div className="admin-data">
							<p className="admin-contact"><i className="fas fa-envelope"></i>&nbsp;&nbsp;{this.state.email}</p>
							<p className="admin-contact"><i className="fas fa-phone"></i>&nbsp;&nbsp;{this.state.phoneNumber}</p>
						</div>
					</div>
				:
					<div className="d-flex justify-content-center">
						<div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				}
      </div>
    );
  }
}

const mapStateToProps = state =>({
	getuser: state.userReducer.getuser
});

const mapDispatchToProps = dispatch =>({
	getUserAccount: () => {
		dispatch(getUserAccount());
	}
})
export default connect(mapStateToProps,mapDispatchToProps)(Overview);
