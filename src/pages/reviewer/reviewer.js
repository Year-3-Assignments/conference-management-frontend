  import React, { Component } from 'react'
import {connect} from 'react-redux';
import { getAllResources, chnageResourceState } from '../../actions/resourceActions';
import _ from 'lodash';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import firebase from '../../firebase.config';
import moment from 'moment';
import './reviwer.scss';

class Reviewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
      id: "",
      name: "",
      amount: "",
      status: "",
      message: "",
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('role') !== 'ROLE_REVIEWER') {
      if (localStorage.getItem('role') === 'ROLE_USER') {
        window.location = '/me';
      } else if (localStorage.getItem('role') === 'ROLE_EDITOR') {
        window.location = '/me/editor';
      } else if (localStorage.getItem('role') === 'ROLE_ADMIN') {
        window.location = '/admin/dashboard';
      }
    }

    this.props.getAllResource();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.allResources !== nextProps.allResources) {
      this.setState({ resources: nextProps.allResources });
    }

    if(this.props.changeResourceStatus !== nextProps.changeResourceStatus) {
      this.props.getAllResource();
    }

  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false, amount: '', status: '-' });
  };

  setStatusFormatter(cell, row) {
    console.log('cell', cell)
    if (_.isEqual(cell, 'PENDING')) {
      return <span className="badge rounded-pill bg-warning text-dark"><strong>PENDING</strong></span>
    }

    if (_.isEqual(cell, 'APPROVED')) {
      return <span className="badge rounded-pill bg-success text-dark"><strong>APPROVED</strong></span>
    }

    if (_.isEqual(cell, 'REJECTED')) {
      return <span className="badge rounded-pill bg-danger text-dark"><strong>REJECTED</strong></span>
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setApprove(e, id, name) {
    this.setState({
      id: id,
      name: name
    })
  }

  manageStatus(row){
    return (
      <div>
        <button style={{margin: '1em'}} type="button"
          className="btn btn-primary btn--pill"
          data-mdb-toggle="modal"
          data-mdb-target="#staticBackdrop"
          onClick={e => this.setState({ id: row._id })}
        >
          Approve/Reject
        </button>
      </div>
    );
  }

  onSubmit(){
    if(this.state.status === 'APPROVED'){
      const resource = {
        id: this.state.id,
        status: this.state.status,
        amount: this.state.amount,
        message: this.state.message
      };
      console.log(resource);
      this.props.chnageResourceState(resource);
    }
    
    if(this.state.status === 'REJECTED'){
      const resource = {
        id: this.state.id,
        status: this.state.status,
        amount: this.state.amount,
        message: this.state.message
      };
      console.log(resource);
      this.props.chnageResourceState(resource);
    }
  }

  tableColumnData = [
    { dataField: '_id', text: 'Request ID',  headerStyle: () => { return {width: '150px'}}},
    { dataField: 'time', text: 'Date & Time'},
    { dataField: 'name', text: 'Name'},
    { dataField: 'type', text: 'Type', formatter: col => col.toUpperCase()},
    { dataField: 'status', text: 'Status', formatter: (cell, row) => this.setStatusFormatter(cell, row)},
    { dataField: 'createdby', text: 'Requested By', formatter: (col, row) => <div><img src={col.imageurl} className="created-person-img" />&nbsp;&nbsp;{col.firstname}&nbsp;{col.lastname}</div>},
    { dataField: 'rejectorapprove', text: 'Reject/Approve', formatter: (col, row) => this.manageStatus(row)},
  ];

  expandRow = {
    showExpandColumn: true,
    renderer: row => (
      <div className="row">
        <div className="col-md-6">
          <h6>Resource Persons</h6>
          <div className="row">
            {row.resourcepersons.length > 0 && row.resourcepersons.map((person, index) => (
              <div className="mb-1 col-md-4" key={index}>
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

  render() {
    return (
      <div className="container">    
        <div className="card p-4 mt-4">
          <h4 className="reviewer-header">Resources Review</h4>
          <BootstrapTable 
            keyField='_id' 
            data={ this.state.resources } 
            columns={ this.tableColumnData } 
            pagination={ paginationFactory() } 
            striped
            hover
            headerClasses="header-class"
            expandRow={this.expandRow}
          />
        </div>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-mdb-backdrop="static"
          data-mdb-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title form-title" id="staticBackdropLabel">Resource Review</h5>
                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="form-check-inline form-field">Select an action : </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="status" id="approve" value="APPROVED" onChange={this.onChange} />
                  <label className="form-check-label" htmlFor="approve">APPROVE</label>
                </div>
            
                <div className="form-check form-check-inline mb-2">
                  <input className="form-check-input" type="radio" name="status" id="reject" value="REJECTED" onChange={this.onChange} />
                  <label className="form-check-label" htmlFor="reject">REJECT</label>
                </div>
                <div className="row m-0 mb-2">
                  <label htmlFor="amount" className="form-label p-0 form-field">Amount to Pay</label>
                  <input type="number" id="amount" className="form-control" name="amount" onChange={this.onChange} />
                </div>
                <div className="row m-0 mb-2">
                  <label htmlFor="message" className="form-label p-0 form-field">Review Message</label>
                  <textarea type="description" rows="4" id="message" className="form-control" name="message" onChange={this.onChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light btn--pill" data-mdb-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-primary btn--pill"  onClick={this.onSubmit}>submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state =>({
  allResources: state.resourceReducer.allResources,
  changeResourceStatus: state.resourceReducer.changeResourceStatus
});

const mapDispatchToProps = dispatch =>({
  getAllResource: () =>{
    dispatch(getAllResources());
  },
  chnageResourceState: (resource) =>{
    dispatch(chnageResourceState(resource));
  },
})

export default connect(mapStateToProps,mapDispatchToProps)(Reviewer);