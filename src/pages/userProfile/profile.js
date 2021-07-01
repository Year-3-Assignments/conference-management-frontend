import React from 'react';
import './userProfilePage.scss';
import {connect} from 'react-redux';
import { getUserAccount, requestChangeUserRole } from '../../actions/userActions';

let initialState = {
  userId: '',
  firstName: '',
  lastName: '',
  userName: '',
  description: '',
  profileImage: '',
  email: '',
  phonenumber: '',
  isEditClicked: false,
  isRoleRequested: false,
  buttonText: 'edit profile'
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = initialState;
  }

  componentDidMount(){
    if(localStorage.getItem('token') !== null){
      this.props.getUserAccount();
    }
  }

  componentWillReceiveProps = (nextProps) =>{
    console.log(nextProps.getUser);
    if(this.props.getuser !== nextProps.getuser){
      console.log("User Information", nextProps.getuser);
      this.setState({
        userId: nextProps.getuser._id,
        firstName: nextProps.getuser.firstname,
        lastName: nextProps.getuser.lastname,
        description: nextProps.getuser.description,
        userName: nextProps.getuser.username,
        email: nextProps.getuser.email,
        phonenumber: nextProps.getuser.phonenumber,
        isRoleRequested: nextProps.getuser.isrolerequested,
        profileImage: nextProps.getuser.imageurl
      });
    }
    
    if (this.props.changeuserrole !== nextProps.changeuserrole) {
      this.props.getUserAccount();
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onEditClick(e) {
    this.setState({ isEditClicked: !this.state.isEditClicked }, () => {
      this.setState({ buttonText: this.state.isEditClicked ? 'cancel': 'edit profile' })
    });
  }

  setRequestForReviewer(e) {
    const requestData = {
      requestedby: this.state.userId,
      requestrole: 'ROLE_REVIEWER',
      message: 'I want to change my role to reviewer.'
    }
    console.log(requestData);
    this.props.requestChangeUserRole(requestData);
  }

  render() {
    return (
      <div>
        <div className="profile">
          <div className="card">
            <div className="row">
              <div className="col-md-3">
                <img src={this.state.profileImage} className="p-4 profile-img" />
              </div>
              <div className="col-md-9">
                <div className="p-4">
                  <h5 className="name">{this.state.firstName}&nbsp;{this.state.lastName}</h5>
                  <p className="username">@{this.state.userName}</p>
                  <p className="d-inline"><i className="fas fa-envelope"></i>&nbsp;&nbsp;{this.state.email}</p>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p className="d-inline"><i className="fas fa-phone"></i>&nbsp;&nbsp;{this.state.phonenumber}</p>
                  <p className="user-description mb-2">{this.state.description}</p>
                  {this.state.isRoleRequested === false ?
                    <div>
                      <button className="d-inline btn btn-sm btn--pill btn-outline-warning" onClick={e => this.setRequestForReviewer(e)}>request for reviewer</button>&nbsp;&nbsp;&nbsp;
                      <button className="d-inline btn btn-sm btn--pill btn-outline-primary">request for editor</button>
                    </div>
                  :
                    <button  className="btn btn-sm btn-outline-primary btn--pill"><i>your role request is under processing</i></button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  getuser: state.userReducer.getuser,
  changeuserrole: state.userReducer.requestchangeuserrole,
  getUserError: state.userReducer.getUserError
});

const mapDispatchToProps = dispatch =>({
  getUserAccount: () =>{
    dispatch(getUserAccount());
  },
  requestChangeUserRole: roleData => {
    dispatch(requestChangeUserRole(roleData));
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(Profile);