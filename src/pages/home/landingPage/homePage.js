import React, { Component } from 'react';
import { connect } from 'react-redux';
import Conference from './conference';
import AbouteConference from './aboutConference';
import KeyNoteSpeakers from './keynoteSpeakers';
import UpcommingConference from './upcommingConference';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Conference />
        <AbouteConference />
        <KeyNoteSpeakers />
        <UpcommingConference />
      </div>
    )
  }
}

const mapStateToProps = state =>({

});

const mapDispatchToProps = dispatch =>({

})
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
