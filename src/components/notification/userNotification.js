import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import firebase from '../../firebase.config';
import { makeNotificationArchive } from '../../actions/userActions';
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
          <hr className="hr" />
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
            <button className="btn btn-sm btn-success btn--pill">{`PAY LKR ${this.props.notificationData.amount}.00 NOW`}</button><br/>
            <small className="text-muted">
              <i>You need to pay LKR {this.props.notificationData.amount}.00 to send this resources to the editor</i>
            </small>
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
  }
});
export default connect(mapStateToProps,mapDispatchToProps)(UserNotification);