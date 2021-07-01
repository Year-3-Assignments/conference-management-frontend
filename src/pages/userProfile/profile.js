import React from 'react';
import './userProfilePage.scss';
import {connect} from 'react-redux';
import {getUserAccount} from '../../actions/userActions';

let initialState = {
  firstName: '',
  lastName: '',
  userName: '',
  description: '',
  profileImage: '',
  email: '',
  phonenumber: '',
  isEditClicked: false,
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
        firstName: nextProps.getuser.firstname,
        lastName: nextProps.getuser.lastname,
        description: nextProps.getuser.description,
        userName: nextProps.getuser.username,
        email: nextProps.getuser.email,
        phonenumber: nextProps.getuser.phonenumber,
        profileImage: nextProps.getuser.imageurl
      });
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
                  <p className="user-description">{this.state.description}</p>
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
  getUserError: state.userReducer.getUserError
});

const mapDispatchToProps = dispatch =>({
  getUserAccount: () =>{
    dispatch(getUserAccount());
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(Profile);