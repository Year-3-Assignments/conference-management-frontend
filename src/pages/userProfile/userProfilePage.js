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
          <div className="col-md-2">
            <Profile />
          </div>
          <div className="col-md-10">
            <UserResource />
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfilePage;