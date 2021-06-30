import React, { Component } from 'react';
import { connect } from 'react-redux';
import Conference from './conference';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Conference />
      </div>
    )
  }
}

const mapStateToProps = state =>({

});

const mapDispatchToProps = dispatch =>({

})
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
