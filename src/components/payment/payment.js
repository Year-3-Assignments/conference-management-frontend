import React from 'react';
import moment from 'moment';
import './payment.scss';

function Payment({ image, firstName, lastName, date, amount }) {
  return (
    <div className="border m-2 p-2">
      <div className="p-2 payment-info-container">
        <div className="payment-info">
          <img src={image} alt="profile-image" className="payment-profile" />
        </div>
        <div className="payment-info payment-user-name">
          <p className="badge rounded-pill custom-badge-name bg-light text-dark">{firstName}&nbsp;{lastName}</p>
        </div>
        <div className="payment-info payment-user-name">
          <p className="badge rounded-pill bg-info text-dark">{moment(date).format('lll')}</p>
        </div>
        <div className="payment-info payment-user-name">
          <p className="badge rounded-pill bg-success text-dark">LKR.{amount}.00</p>
        </div>
      </div>
    </div>
  );
}

export default Payment;