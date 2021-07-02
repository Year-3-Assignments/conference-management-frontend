import React, {Component} from 'react';
import {getWorkshopsForHomePage} from '../../../actions/workshopActions';
import {connect} from 'react-redux';
import './workshopPage.scss';
import _ from 'lodash';

const initialState = {
  resources:[],
  users:[],
  workshop:''
};


class WorkshopPage extends Component {
  constructor(props){
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.props.getWorkshopsForHomePage();
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.props.homepageworkshop !== nextProps.homepageworkshop){
      this.setState({ workshop: nextProps.homepageworkshop });
    }
  }
  
  render() {
    return(
      <div>
        <div>
          <h1 className="text-center workshop-section workshop-title">WORKSHOPS</h1>
        </div>
        <div className="container mt-5 card p-3">
        {this.state.workshop && this.state.workshop.length > 0 && this.state.workshop.map((workshop) => (
              <div key={workshop._id} >
                <h2>  Workshop Topic : "{workshop.name}"</h2>
              </div>
            ))}

        {this.state.workshop && this.state.workshop.length > 0 && this.state.workshop.map((workshop) => (
          <div key={workshop._id} className="text-center">
              <div className="row">
                {workshop.resource.resourcepersons && workshop.resource.resourcepersons.map((person) => (
                <div key={person._id} className="mb-2 col-md-4">
                  <div className="">
                    <div className="figure col-lg-3 mb-2 ">
                      <img src={person.imageurl} className="figure-img workshop-person-img" />
                      <figcaption className="workshop-person-name figure-caption">{person.firstname}&nbsp;&nbsp;{person.lastname}</figcaption>
                    </div>
                  </div>
                </div>
                ))}
              </div>
              <p className="workshop-description">{workshop.description}</p>
              <p className="workshop-place">@ {workshop.resource.venue}</p>
              <p className="workshop-time">{workshop.resource.time}</p>
          </div>
        ))}
        </div>   
      </div>
    )
  }
}

const mapStateToProps = state => ({
  homepageworkshop: state.workshopReducer.homepageworkshop
});

const mapDispatchToProps = dispatch => ({
  getWorkshopsForHomePage: () => {
    dispatch(getWorkshopsForHomePage());
  } 
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopPage);