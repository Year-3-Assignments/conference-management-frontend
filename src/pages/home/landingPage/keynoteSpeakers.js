import React, { Component } from 'react';
import { connect } from 'react-redux';

class KeyNoteSpeakers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="keynote-section pb-4">
        <h1 className="text-center keynote-title pt-4 mb-5">Keynote Speakers</h1>
        <div className="row">
          {this.props.conference[0] && this.props.conference[0].resource &&
            this.props.conference[0].resource.resourcepersons &&
            this.props.conference[0].resource.resourcepersons.map((person, index) => (
              <div className="col-md-6 text-center"><br/>
                <img src={person.imageurl} className="keynote-person-img" />
                <h3 className="keynote-person-name">{person.firstname}&nbsp;&nbsp;{person.lastname}</h3>
                <p className="keynote-person-description">{person.description}</p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  conference: state.conferenceReducer.homepageconference
});

const mapDispatchToProps = dispatch =>({

})
export default connect(mapStateToProps,mapDispatchToProps)(KeyNoteSpeakers);