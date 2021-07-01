import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import firebase from '../../firebase.config';
import { makeNotificationArchive } from '../../actions/userActions';
import { resourcePayment } from '../../actions/resourceActions';
import './notification.scss';

class UserNotification extends Component {
  constructor(props) {
    super(props);
  }

  setNotificationArchive(e) {
    if (this.props.notificationData._id !== null) {
      const notification = {
        id: this.props.notificationData._id
      }
      this.props.makeNotificationArchive(notification);
    }
  }

  makePayment(e, data) {
    const paymentInfo = {
      id: data.resource._id,
      amount: data.amount,
      notificationId: data._id
    }
    console.log(paymentInfo)
    this.props.resourcePayment(paymentInfo);
  }

  render() {
    return (
      <div className="border m-2">
        <div className="p-2 row">
          <div className="col-md-2">
            <h6 className="notification-title">From</h6>
            <p className="message">{this.props.notificationData.from.firstname}&nbsp;{this.props.notificationData.from.lastname}</p>
            <img src={this.props.notificationData.from.imageurl} className="notification-img" />&nbsp;&nbsp;
            <p className="badge rounded-pill bg-custom-light text-dark">{this.props.notificationData.from.email}</p>
          </div>
          <div className="col-md-2">
            <h6 className="notification-title">To</h6>
            <p className="message">{this.props.notificationData.to.firstname}&nbsp;{this.props.notificationData.to.lastname}</p>
            <img src={this.props.notificationData.to.imageurl} className="notification-img" />&nbsp;&nbsp;
            <p className="badge rounded-pill bg-custom-light text-dark">{this.props.notificationData.to.email}</p>
          </div>
          <div className="col-md-7">
            <p className="message">{this.props.notificationData.message}</p>
          </div>
          <div className="col-md-1">
            <button className="btn btn--pill btn-info" data-mdb-toggle="tooltip" title="Archive this notification" onClick={e => this.setNotificationArchive(e)}>
              <i className="fas fa-archive fa-lg"></i>
            </button>
          </div>
        </div>
        <div>
          {this.props.notificationData.resource ? 
            <div className="row p-2">
              <h6 className="notification-title">More Information</h6>
              <div className="col-md-6">
                <i className="fas fa-id-card"></i>&nbsp;<span className="message">Resource ID :&nbsp;&nbsp;</span>
                <p className="badge rounded-pill bg-custom-light text-dark">{this.props.notificationData.resource._id}</p>
                <p className="message"><i className="fas fa-bookmark"></i>&nbsp;Name :&nbsp;&nbsp;{this.props.notificationData.resource.name}</p>
                <p className="message"><i className="fas fa-map-pin"></i>&nbsp;Venue :&nbsp;&nbsp;{this.props.notificationData.resource.venue}</p>
                <p className="message"><i className="fas fa-align-left"></i>&nbsp;Description : {this.props.notificationData.resource.description}</p>
                <p className="message"><i className="fas fa-clock"></i>&nbsp;Time : {moment(this.props.notificationData.resource.time).format('LLLL')}</p>
              </div>
              <div className="col-md-6">
                {this.props.notificationData.resource.resourceurls && this.props.notificationData.resource.resourceurls.length > 0 ? 
                  <div>
                    <h6 className="resource-title">Approved Documents</h6>
                    {this.props.notificationData.resource.resourceurls.map((item, index) => (
                      <div key={index}> 
                        <i className="fas fa-file-alt"></i>&nbsp;
                          <a href={item} target="_blank" className="message">{firebase.storage().refFromURL(item).name}</a>
                      </div>
                    ))}
                  </div>
                :
                  null
                }
              </div>
            </div>
          :
            null
          }
        </div>
  
        {this.props.notificationData.conference ? 
          <div className="row p-2">
            <h6 className="notification-title">More Information</h6>
            <div className="col-md-6">
              <i className="fas fa-id-card"></i>&nbsp;<span className="message">Conference ID :&nbsp;&nbsp;</span>
              <p className="badge rounded-pill bg-custom-light text-dark">{this.props.notificationData.conference._id}</p>
              <p className="message"><i className="fas fa-bookmark"></i>&nbsp;Name :&nbsp;&nbsp;{this.props.notificationData.conference.name}</p>
              <p className="message"><i className="fas fa-map-pin"></i>&nbsp;Venue :&nbsp;&nbsp;{this.props.notificationData.conference.venue}</p>
              <p className="message"><i className="fas fa-align-left"></i>&nbsp;Description : {this.props.notificationData.conference.description}</p>
              <p className="message"><i className="fas fa-clock"></i>&nbsp;Start Date : {moment(this.props.notificationData.conference.startdate).format('LLLL')}</p>
              <p className="message"><i className="fas fa-clock"></i>&nbsp;Start Date : {moment(this.props.notificationData.conference.enddate).format('LLLL')}</p>
            </div>
          </div>
        :
          null
        }
  
        {this.props.notificationData.workshop ? 
          <div className="row p-2">
            <h6 className="notification-title">More Information</h6>
            <div className="col-md-6">
              <i className="fas fa-id-card"></i>&nbsp;<span className="message">Conference ID :&nbsp;&nbsp;</span>
              <p className="badge rounded-pill bg-custom-light text-dark">{this.props.notificationData.workshop._id}</p>
              <p className="message"><i className="fas fa-bookmark"></i>&nbsp;Name :&nbsp;&nbsp;{this.props.notificationData.workshop.name}</p>
              <p className="message"><i className="fas fa-map-pin"></i>&nbsp;Venue :&nbsp;&nbsp;{this.props.notificationData.workshop.place}</p>
              <p className="message"><i className="fas fa-align-left"></i>&nbsp;Description : {this.props.notificationData.workshop.description}</p>
              <p className="message"><i className="fas fa-clock"></i>&nbsp;Date : {moment(this.props.notificationData.workshop.time).format('LLLL')}</p>
            </div>
          </div>
        :
          null
        }
        {this.props.notificationData.payment && this.props.notificationData.payment === true ? 
          <div className="p-2">
            <button className="btn btn-sm btn-success btn--pill" data-mdb-toggle="modal"
              data-mdb-target="#payment-modal">{`PAY LKR ${this.props.notificationData.amount}.00 NOW`}
            </button><br/>
            <small className="text-muted">
              <i>You need to pay LKR {this.props.notificationData.amount}.00 to send this resources to the editor</i>
            </small>
            <div
              className="modal fade"
              id="payment-modal"
              data-mdb-backdrop="static"
              data-mdb-keyboard="false"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title form-title" id="staticBackdropLabel">Pay for the Resource</h5>
                    <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="row m-0 mb-2">
                      <label htmlFor="email" className="form-label p-0 form-field">Email</label>
                      <input type="text" id="email" className="form-control" name="email" value={this.props.notificationData.to.email} disabled />
                    </div>
                    <div className="row m-0 mb-2">
                      <label htmlFor="name" className="form-label p-0 form-field">Name on the Card</label>
                      <input type="text" id="name" className="form-control" name="name" />
                    </div>
                    <div className="row m-0 mb-2">
                      <label htmlFor="card-number" className="form-label p-0 form-field">Credit Card Number</label>
                      <input type="number" id="card-number" className="form-control" name="cardnumber" />
                    </div>
                    <div className="row mb-4">
                      <div className="col-6">
                        <label className="form-label form-field" htmlFor="experation">Expiration</label>
                        <input type="text" id="experation" className="form-control" />
                      </div>
                      <div className="col-6">
                        <label className="form-label form-field" htmlFor="formCVV">CVV</label>
                        <input type="text" id="formCVV" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-light btn--pill" data-mdb-dismiss="modal">
                      Close
                    </button>
                    <button type="button" className="btn btn-success btn--pill" data-mdb-dismiss="modal" onClick={e => this.makePayment(e, this.props.notificationData)}>
                      make payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        :
          null 
        }
      </div>
    );
  }
}

const mapStateToProps = state =>({
  
});

const mapDispatchToProps = dispatch =>({
  makeNotificationArchive: (notification) => {
    dispatch(makeNotificationArchive(notification));
  },
  resourcePayment: (paymentData) => {
    dispatch(resourcePayment(paymentData));
  }
});
export default connect(mapStateToProps,mapDispatchToProps)(UserNotification);