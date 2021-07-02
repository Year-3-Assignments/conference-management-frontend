import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpCommingEvent from '../../../components/upcommingEvent/upcommingEvent';
import './upcommingConference.scss';

class UpCommingEvents extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="upcomming-section container mb-5">
        <h1 className="text-center upcomming-title pt-4 pb-4">Upcomming Events</h1>
        <div className="row">
          {this.props.approvedconferences && this.props.approvedconferences.length > 0 &&
            this.props.approvedconferences.map((event, index) => (
              <div className="col-md-4" key={index}>
                <UpCommingEvent 
                  name={event.name} 
                  imageurl={event.image_url} 
                  description={event.description} 
                  resource={event.resource} 
                  amount={event.amount} 
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  approvedconferences: state.conferenceReducer.approvedconferences
});

const mapDispatchToProps = dispatch =>({
  
})
export default connect(mapStateToProps,mapDispatchToProps)(UpCommingEvents);