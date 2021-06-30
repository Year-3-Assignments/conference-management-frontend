import React from 'react';
import PropTypes from 'prop-types';

class Progress extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="progress">
        <div 
          className="progress-bar bg-primary"
          role="progressbar"
          style={{ width: `${this.props.percentage}%`}}
          aria-valuenow={`${this.props.percentage}`}
          aria-valuemin='0'
          aria-valuemax='100'
        />
      </div>
    );
  }
}

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
}

export default Progress;