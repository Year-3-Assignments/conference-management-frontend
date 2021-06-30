import React from 'react';
import { connect } from 'react-redux';
import { getResourcesForUser } from '../../actions/resourceActions';
import _ from 'lodash';
import CreateResource from '../resourceCreator/createResource';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './userResource.scss';
import moment from 'moment';
import firebase from '../../firebase.config';

const initialState = {
  resources: [],
  users: []
};

class UserResources extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if (!_.isNull(localStorage.getItem('token'))) {
      this.props.getResourcesForUser();
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.userResources !== nextProps.userResources) {
      this.setState({ resources: nextProps.userResources });
    }

    if (this.props.createResource !== nextProps.createResource) {
      if (!_.isNull(localStorage.getItem('token'))) {
        this.props.getResourcesForUser();
      }
    }
  }

  tableColumnData = [
    { dataField: 'actions', text: 'Actions', formatter: this.buttonFormatter.bind(this), headerStyle: () => { return {width: '50px' }}},
    { dataField: '_id', text: 'Request ID', formatter: (cell) => this.setIdFormatter(cell)},
    { dataField: 'name', text: 'Name'},
    { dataField: 'type', text: 'Type', formatter: col => col.toUpperCase()},
    { dataField: 'status', text: 'Status', formatter: (cell, row) => this.setStatusFormatter(cell, row)},
    { dataField: 'createdby', text: 'Requested By', formatter: (col, row) => <div><img src={col.imageurl} className="created-person-img" />&nbsp;&nbsp;{col.firstname}&nbsp;{col.lastname}</div>}
  ];

  setIdFormatter(cell) {
    return (<p className="badge rounded-pill bg-custom-light text-dark">{cell}</p>)
  }

  setStatusFormatter(cell, row) {
    if (_.isEqual(cell, 'PENDING')) {
      return <span className="badge rounded-pill bg-warning text-dark"><strong>PENDING</strong></span>
    }

    if (_.isEqual(cell, 'APPROVED')) {
      return <span className="badge rounded-pill bg-success text-dark"><strong>APPROVED</strong></span>
    }
  }

  expandRow = {
    showExpandColumn: true,
    renderer: row => (
      <div className="row">
        <div className="col-md-6">
          <h6>Resource Persons</h6>
          <div className="row">
            {row.resourcepersons.length > 0 && row.resourcepersons.map((person, index) => (
              <div className="mb-3 col-md-6" key={index}>
                <img src={person.imageurl} className="created-person-img" />&nbsp;&nbsp;&nbsp;
                <h6 className="person-info m-0">{person.firstname}&nbsp;{person.lastname}</h6>
                <p><i className="fas fa-at"></i>&nbsp;&nbsp;{person.username}</p>
                <p><i className="fas fa-envelope"></i>&nbsp;&nbsp;{person.email}</p>
                <p><i className="fas fa-phone"></i>&nbsp;&nbsp;{person.phonenumber}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h6>Request Information</h6>
          <p><i className="fas fa-align-left"></i>&nbsp;{row.description}</p>
          <p><i className="fas fa-map-pin"></i>&nbsp;{row.venue}</p>
          <p><i className="fas fa-clock"></i>&nbsp;{moment(row.createdAt).format('LLLL')}</p>
          <h6 className="mt-1">Submitted Documents</h6>
          {row.resourceurls.length > 0 && row.resourceurls.map((item, index) => (
            <div key={index}> 
              <i className="fas fa-file-alt"></i>&nbsp;<a href={item} target="_blank">{firebase.storage().refFromURL(item).name}</a>
            </div>
          ))}
        </div>
      </div>
    )
  };

  buttonFormatter(cell, row, rowIndex) {
    return (
      <div>
        <span className="dropdown show">
          <span className="dropdown">
            <a href="" data-mdb-toggle="dropdown" aria-expanded="true">
            <i className="fas fa-bars" style={{ color: '#000'}}></i>
            </a>
            <div className="dropdown-menu dropdown-menu-left">
              <button className="dropdown-item custom-button" data-target="#update_complaint" data-toggle="modal"><i className="fas fa-edit"></i>&nbsp;&nbsp;Edit</button>
              <button className="dropdown-item custom-button" data-target="#delete_item" data-toggle="modal"><i className="fas fa-trash"></i>&nbsp;&nbsp;Delete</button>
            </div>
          </span>
        </span>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <h3 className="mt-5 payment-title">My Resources</h3>
        <div className="d-flex justify-content-end">
          <button className="btn btn-info btn--pill float-end mb-4 resource-btn" data-mdb-toggle="modal" data-mdb-target="#create_resource">
            <span>
              <i className="fas fa-plus"></i>&nbsp;&nbsp;
              <span>New Resource</span>
            </span>
          </button>
        </div>
        <div className="card p-4">
          <BootstrapTable 
            keyField='_id' 
            data={ this.state.resources } 
            columns={ this.tableColumnData } 
            pagination={ paginationFactory() } 
            striped
            hover
            headerClasses="header-class"
            expandRow={this.expandRow}
            wrapperClasses="table-responsive"
          />
        </div>
        <CreateResource />
      </div>
    );
  }
}

const mapStateToProps = state =>({
  userResources: state.resourceReducer.userResources,
  createResource: state.resourceReducer.createResource
});

const mapDispatchToProps = dispatch =>({
  getResourcesForUser: () => {
    dispatch(getResourcesForUser());
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(UserResources);