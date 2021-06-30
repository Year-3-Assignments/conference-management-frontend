import React from 'react';
import Progress from '../progress/progress';
import firebase from '../../firebase.config';
import './createResource.scss';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { createResource } from '../../actions/resourceActions';
import { getAllUsers } from '../../actions/userActions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

let formData = {};
let initialState = {
    uploadPercentatge: 0,
    users: [],
    resourceUrls: [],
    resourcePersons: [],
    resourceName: '',
    resources: [],
    venue: '',
    time: new Date(),
    modifiedTime: '',
    resourceType: '',
    description: '',
    status: '',
    isFormInvalid: false,
    buttonText: 'CREATE'
};
const $ = require('jquery');
class CreateResource extends React.Component{
  constructor(props){
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.setUploadPercentage = this.setUploadPercentage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.uploadResourceFile = this.uploadResourceFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onResourcePersonsChange = this.onResourcePersonsChange.bind(this);
    this.state = initialState;   
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getallusers !== nextProps.getallusers) {
      let options = [];
      nextProps.getallusers.map((item, index) => {
        let user = {
          value: item._id,
          label: <div><img src={item.imageurl} className="thumb-img" />&nbsp;&nbsp;{`${item.firstname} ${item.lastname}`}</div>
        };
        options.push(user);
      })
      this.setState({ users: options });
    }
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value});
  }

  onTimeChange(time) {
    this.setState({ modifiedTime: moment(time).format('LLLL'), time: time });
  }

  onFileChange(e){
    this.setState({ resources: e.target.files});
  }

  onResourcePersonsChange(e) {
    this.setState({ resourcePersons: e ? e.map(user => user.value) : [] });
  }

  setUploadPercentage(progress){
    this.setState({ uploadPercentatge: progress });
  }

  uploadResourceFile(e){
    e.preventDefault();
    if(this.state.resources.length > 0 ) {
      let folderName = "Resources";
      let files = this.state.resources;
      
      for (let i = 0; i < files.length; i++) {
        let upload = firebase.storage().ref(`${folderName}/${uuidv4()}/${files[i].name}`).put(files[i]);

        upload.on('state_changed', (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setUploadPercentage(progress);
        }, (error) => {
          console.log(error);
        }, () => {
          upload.snapshot.ref.getDownloadURL()
          .then(url => {
            this.state.resourceUrls.push(url);
            NotificationManager.success('File uploaded successfully')
          });
        });
      }
    } else {
      NotificationManager.warning('Please select a file')
    }
  }

  validateResourceForm(){
    const data = {
      resourceurls: this.state.resourceUrls && this.state.resourceUrls.length > 0 ? this.state.resourceUrls : null,
      resourceName: this.state.resourceName && this.state.resourceName.trim().length > 0 ? this.state.resourceName : null,
      venue: this.state.venue && this.state.venue.trim().length > 0 ? this.state.venue : null,
      users: this.state.users && this.state.users.length > 0 ? this.state.users : null,
      resourcetype: this.state.resourceType && this.state.resourceType.trim().length > 0 ? this.state.resourceType : null,
      description: this.state.description && this.state.description.trim().length > 0 ? this.state.description : null,
    };
    formData = Object.assign({}, data);
    return true;
  }

  onSubmit(e){
    e.preventDefault();
    if(this.validateResourceForm()){
      let data = Object.values(formData).map(key => {
        return key !== null;
      });

      if(!data.includes(false)){
        let resource = {
          name: this.state.resourceName,
          venue: this.state.venue,
          time: this.state.modifiedTime,
          description: this.state.description,
          status: 'PENDING',
          type: this.state.resourceType,
          createdby: localStorage.getItem('user_id'),
          resourceurls: this.state.resourceUrls,
          resourcepersons: this.state.resourcePersons,
          ispaid: false
        };
        
        this.props.createResource(resource);
        NotificationManager.success('New Resource is created');
        this.setState(initialState);
        $('#files').val('');
        $('[name=resourceType]').removeAttr('checked');
      }else{
        this.setState({ isFormInvalid: true});
        NotificationManager.warning('Please fill the input fields!')
      }
    }
  }

  render(){
    return (
      <div className="create-resource-form">
        <div className="modal fade" id="create_resource" tabIndex="-1" data-mdb-backdrop="static" data-mdb-keyboard="false">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Send New Request</h5>
                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body p-3" id="resource-form">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label htmlFor="resourceName" className="form-text">Resource Name</label>
                      <input type="text" className="form-control" id="resourceName" name="resourceName" onChange={this.onChange} value={this.state.resourceName} />
                      {formData.resourceName===null && this.state.isFormInvalid ? <span className="text-danger validation-text p-0">Resource name is required</span> : null}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label htmlFor="venue" className="form-text">Venue</label>
                      <input type="text" className="form-control" id="venue" name="venue" onChange={this.onChange} value={this.state.venue} />
                      {formData.venue===null && this.state.isFormInvalid ? <span className="text-danger validation-text p-0">Venue is required</span> : null}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label htmlFor="time" className="form-text">Date & Time</label><br/>
                      <DatePicker
                        selected={this.state.time}
                        onChange={this.onTimeChange}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                        value={this.state.time}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="resourceName" className="form-text">Resource Persons</label>
                  <Select
                    defaultValue={this.state.users.length > 0 ? this.state.users[0].label : null}
                    isMulti
                    name="users"
                    options={this.state.users}
                    className="basic-multi-select"
                    onChange={this.onResourcePersonsChange}
                    classNamePrefix="select"
                  />
                  {formData.users===null && this.state.isFormInvalid ? <span className="text-danger validation-text p-0">Resource persons are required</span> : null}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="description" className="form-text">Description</label>
                  <textarea className="form-control" id="description" rows="3" name="description" onChange={this.onChange} value={this.state.description}></textarea>
                  {formData.description===null && this.state.isFormInvalid ? <span className="text-danger validation-text p-0">Description is required</span> : null}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="time" className="form-text">Resource Type</label><br></br>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input"  type="radio"  id="resource-conference" name="resourceType" onChange={this.onChange} value="conference" />
                    <label className="form-check-label" htmlFor="resource-conference">Conference</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input  className="form-check-input"  type="radio" id="resource-workshop" value="workshop" name="resourceType" onChange={this.onChange} />
                    <label className="form-check-label" htmlFor="resource-workshop">Workshop</label>
                  </div><br/>
                  {formData.resourcetype===null && this.state.isFormInvalid ? <span className="text-danger validation-text p-0">Resource type is required</span> : null}
                </div>
                <div className="form-group mb-3">
                  <label className="form-text" htmlFor="files">Select Resource File</label>
                  <div className="input-group">
                    <input type="file" className="form-control" multiple id="files" onChange={e => this.onFileChange(e)} />
                    <button className="btn btn-color" type="button" onClick={this.uploadResourceFile}>UPLOAD</button>
                  </div>
                  {formData.resourceurls===null && this.state.isFormInvalid ? <span className="text-danger validation-text p-0">Resources are required</span> : null}
                </div>
                <div className="mb-3">
                  <Progress percentage={this.state.uploadPercentatge} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light btn--pill" data-mdb-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-color btn--pill" id="submit-btn" onClick={this.onSubmit}>send request</button>
              </div>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = state =>({
  getallusers: state.userReducer.getallusers
});

const mapDispatchToProps = dispatch =>({
  getAllUsers: () => {
    dispatch(getAllUsers());
  },
  createResource: resource => {
    dispatch(createResource(resource));
  }
});
export default connect(mapStateToProps,mapDispatchToProps)(CreateResource);