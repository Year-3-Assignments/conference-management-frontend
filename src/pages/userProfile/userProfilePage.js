import React from 'react';
import Profile from './profile';
import UserResource from '../../components/userResources/resources';

let initialState = {};

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if (localStorage.getItem('role') !== 'ROLE_USER') {
      if (localStorage.getItem('role') === 'ROLE_REVIEWER') {
        window.location = '/reviewer';
      } else if (localStorage.getItem('role') === 'ROLE_EDITOR') {
        window.location = '/me/editor';
      } else if (localStorage.getItem('role') === 'ROLE_ADMIN') {
        window.location = '/admin/dashboard';
      }
    }
  }

  render() {
    return (
      <div className="container mt-2">
        <div className="row">
          <Profile />
        </div>
        <div className="row">
          <UserResource />
        </div>
      </div>
    );
  }
}

export default UserProfilePage;