import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

class Resources extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container p-4">
        <div className="card p-3">
        
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({

});

const mapDispatchToProps = dispatch =>({

})
export default connect(mapStateToProps,mapDispatchToProps)(Resources);