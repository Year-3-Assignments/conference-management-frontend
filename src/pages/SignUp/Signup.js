import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createUserAccount } from '../../actions/userActions';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import firebase from '../../firebase.config';
import Progress from '../../components/progress/progress';
import './Signup.scss';

let formData = {};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      username: "",
      password: "",
      cnumber: "",
      imageUrl: "",
      desctiption: "",
      role: "",
      formNotValid: false,
      authenticationData: '',
      profileImage: null,
      uploadPercentage: 0,
      role: 'ROLE_USER'
    };

    this.onChange = this.onChange.bind(this);
    this.setUploadPercentage = this.setUploadPercentage.bind(this);
    this.setImageUrl = this.setImageUrl.bind(this);
    this.setImage = this.setImage.bind(this);
  }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.createUser !== nextProps.createUser) {

          // this.setState({ authenticationData: nextProps.setUser.data }, () => {
          //   localStorage.setItem('id', this.state.authenticationData.user_id);
          //   localStorage.setItem('username', this.state.authenticationData.username);
          //   localStorage.setItem('roles', this.state.authenticationData.role);
          //   localStorage.setItem('Authorization', `${this.state.authenticationData.token}`);
          // });

        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    setImage = (e) => {
        this.setState({ profileImage: e.target.files[0] });
    }

    setUploadPercentage = (progress) => {
        this.setState({ uploadPercentage: progress });
    }

    setImageUrl = ({imageUrl}) => {
        this.setState({ imageUrl: imageUrl }, () => {
          console.log('image url', this.state.imageUrl)
        });
    }

    uploadImage =(e) => {
        e.preventDefault();
        if (this.state.profileImage !== null) {
          let folderName = 'Profile-Pictures';
          let file = this.state.profileImage;
          let upload = firebase.storage().ref(`${folderName}/${this.state.username}`).put(file);
    
          upload.on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setUploadPercentage(progress);
          }, (error) => {
            console.log(error);
          }, () => {
            upload.snapshot.ref.getDownloadURL().then((url) => {
              console.log(url);
              this.setImageUrl({ imageUrl: url });
            });
          });
        }
      }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let data = Object.values(formData).map(key => {
        return key != null;
      });
      if (!data.includes(false)) {
        let userData = {
          firstname: this.state.fname,
          lastname: this.state.lname,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          phonenumber: this.state.cnumber,
          imageurl: this.state.imageUrl,
          description: this.state.desctiption,
          role: this.state.role
        };

        console.log('DATA TO SEND', userData);
        this.props.createUserAccount(userData);
        NotificationManager.success('User account successfully created', 'Success')
      } else {
        this.setState({ formNotValid: true }, () => {
          NotificationManager.warning('Please check the input fields');
        });
      }
    }
  }

  validateForm() {
    const data = {
      firstname: this.state.fname && this.state.fname.trim().length > 0 ? this.state.fname : null,
      lastname: this.state.lname && this.state.lname.trim().length > 0 ? this.state.lname : null,
      email: this.state.email && this.state.email.trim().length > 0 ? this.state.email : null,
      username: this.state.username && this.state.username.trim().length > 0 ? this.state.username : null,
      password: this.state.password && this.state.password.trim().length > 0 ? this.state.password : null,
      phonenumber: this.state.cnumber && this.state.cnumber.trim().length > 0 ? this.state.cnumber : null,
      imageurl: this.state.imageUrl && this.state.imageUrl.trim().length > 0 ? this.state.imageUrl : null,
      description: this.state.desctiption && this.state.desctiption.trim().length > 0 ? this.state.desctiption : null
    };
    formData = Object.assign({}, data);
    return true;
  }

  render() {
    return (
      <div className="container mt-5 signup">
        <div className="card p-4">
          <NotificationContainer/>
          <div className="card-body">
            <h2>Create your Account</h2>
            <div className="row mb-2">
              <div className="row m-0 mb-3 col">
                <label htmlFor="fname" className="form-label p-0">First Name</label>
                <input type="text" id="fname" className="form-control" name="fname" value={this.state.fname} onChange={this.onChange}/>
                {formData.firstname===null && this.state.formNotValid ? <span className="text-danger validation-text p-0">First name is required</span> : null}
              </div>
              <div className="row m-0 mb-3 col">
                <label htmlFor="lname" className="form-label p-0">Last Name</label>
                <input type="text" id="lname" className="form-control" name="lname" value={this.state.lname} onChange={this.onChange}/>
                {formData.lastname===null && this.state.formNotValid ? <span className="text-danger validation-text p-0">Last name is required</span> : null}
              </div>
            </div>
            <div className="row m-0 mb-2">
              <label htmlFor="email" className="form-label p-0">Email Address</label>
              <input type="text" id="email" className="form-control" name="email" value={this.state.email} onChange={this.onChange}/>
              {formData.email===null && this.state.formNotValid ? <span className="text-danger p-0 validation-text p-0">Email is required</span> : null}
            </div>
            <div className="row mb-2">
              <div className="row m-0 mb-3 col">
                <label htmlFor="username" className="form-label p-0">Username</label>
                <input type="text" id="username" className="form-control" name="username" value={this.state.username} onChange={this.onChange}/>
                {formData.username===null && this.state.formNotValid ? <span className="text-danger validation-text p-0">Username is required</span> : null}
              </div>
              <div className="row m-0 mb-3 col">
                <label htmlFor="password" className="form-label p-0">Password</label>
                <input type="password" id="password" className="form-control" name="password" value={this.state.password} onChange={this.onChange}/>
                {formData.password===null && this.state.formNotValid ? <span className="text-danger validation-text p-0">Password is required</span> : null}
              </div>
            </div>
            <div className="row m-0 mb-2">
              <label htmlFor="cnumber" className="form-label p-0">Contact Number</label>
              <input type="cnumber" id="email" className="form-control" name="cnumber" value={this.state.cnumber} onChange={this.onChange}/>
              {formData.phonenumber===null && this.state.formNotValid ? <span className="text-danger validation-text p-0">Phone number is required</span> : null}
            </div>
            <div className="mb-3">
              <label htmlFor="profile-image" className="form-label">Profile Image</label>
              <div className="input-group">
                <input type="file" className="form-control" id="profile-image" name="imageUrl" onChange={e => this.setImage(e)} />
                <button className="btn btn-color btn-sm" type="button" onClick={this.uploadImage}>UPLOAD</button>
              </div>
              {formData.imageurl===null && this.state.formNotValid ? <span className="text-danger validation-text p-0">Profile image is required</span> : null}
            </div>
            <div className="mb-3">
              <Progress percentage={this.state.uploadPercentage} />
            </div>
            <div className="row m-0 mb-3">
              <label htmlFor="desctiption" className="form-label p-0">Description</label>
              <textarea type="desctiption" id="desctiption" className="form-control" name="desctiption" value={this.state.desctiption} 
                onChange={(e) => {this.setState({desctiption: e.target.value})}}/>
              {formData.description===null && this.state.formNotValid ? <span className="text-danger validation-text p-0">Description is required</span> : null}
            </div>
            <button href='#' className="btn btn-color btn-block" onClick={this.onSubmit}>Sign Up</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    createUser: state.userReducer.createUser
});
  
const mapDispatchToProps = dispatch => ({
    createUserAccount: user => {
      dispatch(createUserAccount(user));
    }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Signup);