import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWorkshopsForHomePage } from '../../../actions/workshopActions';

class WorkshopHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshop: ''
    }
  }

  componentDidMount() {
    this.props.getWorkshopsForHomePage();
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.homepageworkshop !== nextProps.homepageworkshop) {
      this.setState({ workshop: nextProps.homepageworkshop });
    }
  }

  render() {
    return (
      <div>
        {this.state.workshop && this.state.workshop.length > 0 && this.state.workshop.map((workshop) => (
          <div key={workshop._id} className="text-center conference-section">
            <div>
            <div className="conference-title">{workshop.name}</div>
              <p className="conference-description">{workshop.description}</p>
              <p className="conference-place">@ {workshop.resource.venue}</p>
              <p className="conference-time">{workshop.resource.time}</p>
              <button className="btn btn-primary btn--pill button">BOOK A TICKET NOW</button>
            </div>
          </div>
        ))}
        <div className="conduct">
          <h1 className="text-center conduct-title">Workshop Topic </h1>
          {this.state.workshop && this.state.workshop.length > 0 && this.state.workshop.map((workshop) => (
            <div key={workshop._id} className="text-center">
              <div className="row">
                {workshop.resource.resourcepersons && workshop.resource.resourcepersons.map((person) => (
                  <div key={person._id} className="mb-3 col-md-6">
                    <div className="d-block justify-content-center">
                      <img src={person.imageurl} className="conference-person-img" />
                      <h1 className="person-name">{person.firstname}&nbsp;&nbsp;{person.lastname}</h1>
                      <p className="person-description">{person.description}</p>
                      <p className="person-phonenumber">{person.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="cover">
          <div className="conduct-description">
            <h1 className="text-center description-title">You Will Get</h1>
            {this.state.workshop && this.state.workshop.length > 0 && this.state.workshop.map((workshop) => (
              <div key={workshop._id} className="text-center">
                <p className="description">{workshop.resource && workshop.resource.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container pt-5">
          <h1 className="text-center conduct-title">Contact Us For More</h1>
          <div className="row m-0 mb-2">
            <label htmlFor="email" className="form-label p-0 contact-us">Full Name</label>
            <input type="text" id="email" className="form-control" name="email" placeholder="Enter your full name" />
          </div>
          <div className="row m-0 mb-2">
            <label htmlFor="email" className="form-label p-0 contact-us">Email Address</label>
            <input type="text" id="email" className="form-control" name="email" placeholder="Enter your email address" />
          </div>
          <div className="row m-0 mb-2">
            <label htmlFor="email" className="form-label p-0 contact-us">Phone Number</label>
            <input type="text" id="email" className="form-control" name="email" placeholder="Enter your phone number" />
          </div>
          <div className="row m-0 mb-3">
            <label htmlFor="desctiption" className="form-label p-0 contact-us">Message</label>
            <textarea type="desctiption" rows="6" id="desctiption" className="form-control" name="desctiption" />
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn--pill btn-primary mb-4 button">SEND MESSAGE</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state =>({
  homepageworkshop: state.workshopReducer.homepageworkshop
});

const mapDispatchToProps = dispatch =>({
  getWorkshopsForHomePage: () => {
    dispatch(getWorkshopsForHomePage());
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(WorkshopHomePage);