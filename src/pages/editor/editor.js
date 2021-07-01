import React from 'react';
import {connect} from 'react-redux';
import {getEditorResources} from '../../actions/resourceActions';
import _ from 'lodash';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './editor.scss';
import moment from 'moment';
import firebase from '../../firebase.config';
import CreateConference from '../../components/createConference/createConference';
import CreateWorkshop from '../../components/createWorkshop/createWorkshop';

const initialState = {
  resources:[],
  users:[],
  postdata: ''
};

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.setPostInformation = this.setPostInformation.bind(this);
    this.state = initialState;
  }

  componentDidMount(){
    if(!_.isNull(localStorage.getItem('token'))){
      this.props.getEditorResources();
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.editorResources !== nextProps.editorResources) {
      this.setState({ resources: nextProps.editorResources });
    }
  }

  tableColumnData = [
    { dataField: '_id', text: 'Request ID', formatter: (cell) => this.setIdFromatter(cell),  headerStyle: () => { return {width: '150px'}}},
    { dataField: 'time', text: 'Date & Time'},
    { dataField: 'name', text: 'Name'},
    { dataField: 'type', text: 'Type', formatter: col => col.toUpperCase()},
    { dataField: 'status', text: 'Status', formatter: (cell, row) => this.setStatusFormatter(cell, row)},
    { dataField: 'createdby', text: 'Requested By', formatter: (col, row) => <div><img src={col.imageurl} className="created-person-img" />&nbsp;&nbsp;{col.firstname}&nbsp;{col.lastname}</div>},
    { dataField: 'actions', text: 'Actions', formatter: (col, row) => this.manageStatus(row)},
  ];

  setIdFromatter(cell) {
    return (
      <p className="badge resource-badge rounded-pill bg-warning text-dark">{cell}</p>
    );
  }

  setStatusFormatter(cell, row) {
    if (_.isEqual(cell, 'PENDING')) {
      return <span className="badge rounded-pill bg-warning text-dark"><strong>PENDING</strong></span>
    }

    if (_.isEqual(cell, 'APPROVED')) {
      return <span className="badge rounded-pill bg-success text-dark"><strong>APPROVED</strong></span>
    }
  }

  manageStatus(row){
    return (
    <div>
      <div>
    {_.isEqual(row.type.toUpperCase(), 'CONFERENCE') ? 
        <div> <button 
        className="btn btn-info btn-sm btn--pill table-btn" 
        data-mdb-toggle="modal"
        data-mdb-target="#create-conference" 
        onClick={e => this.setPostInformation(e, row)} 
        >
          Create Conference
        </button></div> 
    : null }
    </div>
    <div>
    {_.isEqual(row.type.toUpperCase(), 'WORKSHOP') ? 
        <div> <button 
        className="btn btn-info btn-sm btn--pill table-btn" 
        data-mdb-toggle="modal"
        data-mdb-target="#create-workshop" 
        onClick={e => this.setPostInformation(e, row)} 
        >
          Create Workshop
        </button></div> 
    : null } 
    </div>
    </div>)
  }

  setPostInformation(e, row) {
    this.setState({ postdata: row });
  }

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
        <div className="container p-4">
          <div className="card p-4">
            <h4 className="resource-title">Resources</h4>
            <BootstrapTable 
              keyField='_id' 
              data={ this.state.resources } 
              columns={ this.tableColumnData } 
              pagination={ paginationFactory() } 
              hover
              headerClasses="header-class"
              expandRow={this.expandRow}
              wrapperClasses="table-responsive"
            />
          </div>
          <div><CreateConference data={this.state.postdata} /></div>
          <div><CreateWorkshop data={this.state.postdata} /></div>
      </div>
      );
  }
}

const mapStateToProps = state =>({
  editorResources: state.resourceReducer.editorResources,
});

const mapDispatchToProps = dispatch =>({
  getEditorResources: () =>{
    dispatch(getEditorResources());
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Editor);