import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../keynotePage/keynotePage.scss'
import { getWorkshopsForHomePage } from '../../../actions/workshopActions';
import Workshop from './workshop';

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
    if (this.props.getWorkshopsForHomepage !== nextProps.getWorkshopsForHomepage) {
      this.setState({ workshop: nextProps.getWorkshopsForHomepage });
    }
  }

  render() {
    return (
      <div>
        <div className="keynote-page-section">
          <h1 className="text-center keynote-header">Workshops</h1>
          <p className="text-center text-light nav-text">home/workshops</p>
        </div>
        <div className="container">
          {this.state.workshop && this.state.workshop.length > 0 ?
            <div>
              {this.state.workshop.map((workshop, index) => (
                <div key={index}>
                  <Workshop workshop={workshop} />
                </div>
              ))}
            </div>
          :
            null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state =>({
  getWorkshopsForHomepage: state.workshopReducer.getWorkshopsForHomepage
});

const mapDispatchToProps = dispatch =>({
  getWorkshopsForHomePage: () => {
    dispatch(getWorkshopsForHomePage());
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(WorkshopHomePage);