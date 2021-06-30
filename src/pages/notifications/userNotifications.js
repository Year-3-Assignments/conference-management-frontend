import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserNotifications } from '../../actions/userActions';
import UserNotification from '../../components/notification/userNotification';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class UserNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    }
  }

  componentDidMount() {
    this.props.getUserNotifications();
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.notifications !== nextProps.notifications) {
      this.setState({ notifications: nextProps.notifications });
    }

    if (this.props.makenotificationarchive !== nextProps.makenotificationarchive) {
      this.props.getUserNotifications();
      NotificationManager.success('Notifications update successfully');
    }
  }

  render() {
    return (
      <div className="container p-4">
        <div className="card p-3">
          <h3 className="users-title">My Notifications</h3>
          {this.state.notifications && this.state.notifications.length > 0 ?
            <div>
              {this.state.notifications.slice(0, 5).map((notification, index) => (
                <div key={index}>
                  <UserNotification notificationData={notification} />
                </div>
              ))}
            </div>
          :
            <div>
              <p className="badge rounded-pill bg-custom-light text-dark">CURRENTLY THERE ARN'T ANY</p>
            </div>
          }
        </div>
        <NotificationContainer/> 
      </div>
    );
  }
}

const mapStateToProps = state =>({
  notifications: state.userReducer.usernotifications,
  makenotificationarchive: state.userReducer.makenotificationarchive
});

const mapDispatchToProps = dispatch =>({
  getUserNotifications: () => {
    dispatch(getUserNotifications());
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(UserNotifications);