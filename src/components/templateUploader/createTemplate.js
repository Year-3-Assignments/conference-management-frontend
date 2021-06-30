import React from 'react';
import Progress from '../progress/progress';
import firebase from '../../firebase.config';
import './createTemplate.scss';
import { NotificationContainer, NotificationManager } from 'react-notifications';

let formData = {};
let initialState = {
  templateName: '',
  description: '',
  template: '',
  fileUrl: '',
  uploadPercentatge: 0,
  isFormInvalid: false,
  buttonText: 'UPLOAD'
};

class CreateTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.setUploadPercentatge = this.setUploadPercentatge.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = initialState;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFileChange(e) {
    this.setState({ template: e.target.files[0] });
  }

  setUploadPercentatge(progress) {
    this.setState({ uploadPercentatge: progress });
  }

  uploadImage(e) {
    e.preventDefault();
    if (this.state.template !== '') {
      let folderName = 'Templates';
      let file = this.state.template;
      let upload = firebase.storage().ref(`${folderName}/${file.name}`).put(file);

      upload.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setUploadPercentatge(progress);
      }, (error) => {
        console.log(error);
      }, () => {
        upload.snapshot.ref.getDownloadURL()
        .then(url => {
          this.setState({ fileUrl: url});
          NotificationManager.success('File upload successfully');
          console.log(url)
        });
      });
    } else {
      NotificationManager.warning('Please select a file');
    }
  }

  validateForm() {
    const data = {
      templatename: this.state.templateName && this.state.templateName.trim().length > 0 ? this.state.templateName : null,
      description: this.state.description && this.state.description.trim().length > 0 ? this.state.description : null,
      templateurl: this.state.fileUrl && this.state.fileUrl.trim().length > 0 ? this.state.fileUrl : null
    };
    formData = Object.assign({}, data);
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let data = Object.values(formData).map(key => {
        return key !== null;
      });

      if (!data.includes(false)) {
        let template = {
          templatename: this.state.templateName,
          description: this.state.description,
          templateurl: this.state.fileUrl
        };
        console.log('DATA TO SEND', template);
        NotificationManager.success('New templated added');
      } else {
        this.setState({ isFormInvalid: true });
        NotificationManager.warning('Please fill input fields');
      }
    }
  }

  render() {
    return (
      <div className="create-template-form">
        <div className="p-4 card">
          <h4>Upload center</h4>
          <div className="form-group mb-3">
            <label htmlFor="name" className="form-text">Template Name</label>
            <input type="text" className="form-control" id="name" name="templateName" onChange={this.onChange} value={this.state.templateName} />
            {formData.templatename===null && this.state.isFormInvalid ? <span className="text-danger validation-text p-0">Template name is required</span> : null}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description" className="form-text">Description</label>
            <textarea className="form-control" id="description" rows="3" name="description" onChange={this.onChange} value={this.state.description}></textarea>
            {formData.description===null && this.state.isFormInvalid ? <span className="text-danger validation-text p-0">Description is required</span> : null}
          </div>
          <div className="form-group mb-3">
            <label className="form-text" htmlFor="template-file">Select Template File</label>
            <div className="input-group">
              <input type="file" className="form-control" id="template-file" onChange={e => this.onFileChange(e)} onF />
              <button className="btn btn-info" type="button" onClick={this.uploadImage}>UPLOAD</button>
            </div>
            {formData.templateurl===null && this.state.isFormInvalid ? <span className="text-danger validation-text p-0">Template is required</span> : null}
          </div>
          <div className="mb-3">
            <Progress percentage={this.state.uploadPercentatge} />
          </div>
          <div className="d-flex justify-content-end">
            <a className="btn btn-info btn--pill" href="#!" role="button" onClick={this.onSubmit}>
              <i className="fas fa-cloud-upload-alt fa-lg"></i>&nbsp;&nbsp;SUBMIT
            </a>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default CreateTemplate;