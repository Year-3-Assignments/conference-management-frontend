import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllWorkshops, changeWorkshopStatus } from '../../../actions/workshopActions';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import firebase from '../../../firebase.config';
import './workshops.scss';

const { SearchBar } = Search;
class Workshops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshops: []
    }
  }

  componentDidMount() {
    this.props.getAllWorkshops();
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.allWorkshops !== nextProps.allWorkshops) {
      this.setState({ workshops: nextProps.allWorkshops }, () => {
        console.log(this.state.workshops)
      });
    }

    if (this.props.changeworkshopstatus !== nextProps.changeworkshopstatus) {
      this.props.getAllWorkshops();
    }
  }

  tableColumnData = [
    { dataField: '_id', text: 'Workshop ID', formatter: (cell) => this.setIdFormatter(cell), headerStyle: () => { return {width: '150px'}} },
    { dataField: 'name', text: 'Name' },
    { dataField: 'createdby', text: 'Editor Details', formatter: (cell) => this.setEditorFormatter(cell) },
    { dataField: 'isapproved', text: 'Status', formatter: (cell) => this.setStatusFormatter(cell)},
    { dataField: 'actions', text: 'Action', formatter: this.buttonFormatter.bind(this)}
  ]

  setIdFormatter(cell) {
    return ( <p className="badge user-badge rounded-pill bg-info text-dark">{cell}</p> );
  }

  setEditorFormatter(cell) {
    return (
      <div>
        <img src={cell.imageurl} className="user-img" />&nbsp;&nbsp;
        <p className="m-0 badge user-badge rounded-pill bg-custom-light text-dark">{cell.firstname}&nbsp;&nbsp;{cell.lastname}</p>
      </div>
    );
  }

  setStatusFormatter(cell) {
    return (
      <div>
        {cell ? 
          <p className="badge user-badge rounded-pill bg-danger text-light">PUBLISHED</p>: 
          <p className="badge user-badge rounded-pill bg-warning text-dark">PENDING</p>}
      </div>
    );
  }

  buttonFormatter(cell, row, rowIndex) {
    return (
      <div>
        <button className="btn btn-sm btn-success btn--pill" onClick={e => this.onApproveButtonClick(e, row)}>APPROVE</button>
      </div>
    );
  }

  onApproveButtonClick(e, row) {
    const workshop = {
      id: row._id
    }
    this.props.changeWorkshopStatus(workshop);
  }

  expandRow = {
    showExpandColumn: true,
    renderer: row => (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h6 className="workshop-resource-title">Resource Persons</h6>
            <div className="row">
              {row.resource.resourcepersons.length > 0 && row.resource.resourcepersons.map((person, index) => (
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
            <h6 className="workshop-resource-title">Resource Information</h6>
            <p><i className="fas fa-align-left"></i>&nbsp;{row.resource.description}</p>
            <p><i className="fas fa-map-pin"></i>&nbsp;{row.resource.venue}</p>
            <p><i className="fas fa-clock"></i>&nbsp;{moment(row.resource.createdAt).format('LLLL')}</p>
            <h6 className="mt-1 workshop-resource-title">Submitted Documents</h6>
            {row.resource.resourceurls.length > 0 && row.resource.resourceurls.map((item, index) => (
              <div key={index}> 
                <i className="fas fa-file-alt"></i>&nbsp;<a href={item} target="_blank">{firebase.storage().refFromURL(item).name}</a>
              </div>
            ))}
          </div>
        </div>
        <hr/>
        <div className="row">
          <h6 className="workshop-resource-title m-0">Publish Information</h6>
          <small className="text-muted m-0 mb-2"><i>Note for the Admin : Below information is the data data mainly visible to the user along with above details</i></small>
          <div className="col-md-3">
            <p className="thumbnail-title"><i className="fas fa-image"></i>&nbsp;&nbsp;Thumbnail Image</p>
            <img src={row.image_url} className="workshop-resource-img" />
          </div>
          <div className="col-md-7">
            <p className="thumbnail-title"><i className="fas fa-align-left"></i>&nbsp;&nbsp;Description</p>
            <p>{row.description}</p>
          </div>
        </div>

        <div className="row">
          <div className="editor-content">
            <p>Editor : </p>&nbsp;&nbsp;
            <p><i className="fas fa-user-alt"></i>&nbsp;&nbsp;{row.createdby.firstname}&nbsp;{row.createdby.lastname}</p>&nbsp;&nbsp;
            <p><i className="fas fa-envelope"></i>&nbsp;&nbsp;{row.createdby.email}</p>&nbsp;&nbsp;
            <p><i className="fas fa-phone"></i>&nbsp;&nbsp;{row.createdby.phonenumber}</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="container p-4">
        <div className="card p-3">
          <h3 className="workshop-title">Workshops</h3>
          {this.state.workshops && this.state.workshops.length > 0 ?
            <ToolkitProvider
            keyField="_id"
            data={this.state.workshops}
            columns={this.tableColumnData}
            search
          >
            {props => (
              <div>
                <SearchBar { ...props.searchProps } placeholder="Search users by name" className="mb-3" />
                <BootstrapTable 
                  { ...props.baseProps } 
                  pagination={ paginationFactory() }
                  bordered={false}
                  striped={true}
                  hover={true}
                  headerClasses="header-class"
                  wrapperClasses="table-responsive"
                />
              </div>
            )}
          </ToolkitProvider>
          : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  allWorkshops: state.workshopReducer.allWorkshops,
  changeworkshopstatus: state.workshopReducer.changeworkshopstatus
});

const mapDispatchToProps = dispatch =>({
  getAllWorkshops: () => {
    dispatch(getAllWorkshops());
  },
  changeWorkshopStatus: workshop => {
    dispatch(changeWorkshopStatus(workshop));
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(Workshops);