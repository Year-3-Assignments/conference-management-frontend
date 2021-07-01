import React from 'react';
import Profile from './profile';
import UserResource from '../../components/userResources/resources';

let initialState = {};

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
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