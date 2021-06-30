import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllReviewers } from '../../../actions/userActions';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';

const { SearchBar } = Search;
class Reviewers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewers: []
    }
  }

  componentDidMount() {
    if(localStorage.getItem('token') !== null){
      this.props.getAllReviewers();
    }
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.getallreviewers !== nextProps.getallreviewers) {
      this.setState({ reviewers: nextProps.getallreviewers});
    }
  }

  tableColumData = [
    { dataField: '_id', text: 'Reviewer ID', formatter: (cell) => this.setIdFormatter(cell), headerStyle: () => { return {width: '150px'}}},
    { dataField: 'firstname', text: 'Name', formatter: (cell, row) => this.setNameFormatter(cell, row)},
    { dataField: 'email', text: 'Email', formatter: (cell) => this.setFieldFormatter(cell)},
    {dataField: 'phonenumber', text: 'Phone number', formatter: (cell) => this.setFieldFormatter(cell)},
    { dataField: 'username', text: 'Username', formatter: (cell) => this.setFieldFormatter(cell)},
    { dataField: 'createdAt', text: 'Register Date', formatter: (cell) => this.setDateFormatter(cell)}
  ];

  setIdFormatter(cell) {
    return ( <p className="badge user-badge rounded-pill bg-warning text-dark">{cell}</p> );
  }
  setNameFormatter(cell, row) {
    return (
      <div>
        <img src={row.imageurl} className="user-img" />&nbsp;&nbsp;
        <p className="m-0 badge user-badge rounded-pill bg-custom-light text-dark">
          {row.firstname}&nbsp;&nbsp;{row.lastname}
        </p>
      </div>
    );
  }

  setFieldFormatter(cell) {
    return (
      <p className="badge user-badge rounded-pill bg-custom-light text-dark">
        {cell}
      </p>
    );
  }

  setDateFormatter(cell) {
    return (
      <p className="badge user-badge rounded-pill bg-custom-light text-dark">
        {moment(cell).format('lll')}
      </p>
    );
  }

  render() {
    return (
      <div className="container p-4">
        <div className="card p-3">
          <h3 className="users-title">Reviewers</h3>
          <ToolkitProvider
            keyField="_id"
            data={this.state.reviewers}
            columns={this.tableColumData}
            search
          >
            {props => (
              <div>
                <SearchBar { ...props.searchProps } placeholder="Search reviewers by name" className="mb-3" />
                <BootstrapTable 
                  { ...props.baseProps } 
                  pagination={ paginationFactory() }
                  bordered={false}
                  striped={false}
                  headerClasses="header-class"
                  wrapperClasses="table-responsive"
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  getallreviewers: state.userReducer.getallreviewers
});

const mapDispatchToProps = dispatch =>({
  getAllReviewers: () => {
    dispatch(getAllReviewers());
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(Reviewers);