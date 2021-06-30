import React from 'react';
import './notification.scss';

function Notification({ id, from, message }) {
  return (
    <div className="border m-2">
      <div className="p-2 row">
        <div className="col-md-4">
          <p className="badge rounded-pill bg-warning text-dark">{id}</p>
        </div>
        <div className="col-md-4">
          <img src={from.imageurl} className="notification-profile-img" />&nbsp;&nbsp;
          <p className="badge rounded-pill bg-custom-light text-dark">{from.email}</p>
        </div>
        <div className="col-md-4">
          <p className="message">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Notification;