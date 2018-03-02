import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios'

export default class UploadImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
//      uploadedFileCloudinaryUrl: ''
      uploadedFile: ''
    };
  }

  onImageDrop(files) {
    const file = files[0];
    console.log("onImageDrop:", file);
    this.setState(() => {
      return {
//        uploadedFile: files[0]
        uploadedFile: file
      };
    });
    console.log("onImageDrop2:", this.state.uploadedFile);

    var imageMimeTypes = ['image/jpg' , 'image/jpeg', 'image/png', 'image/bmp', 'image/gif'];

//    for (var key in files) {
    // check if this is a file:
//      if (files.hasOwnProperty(key) && files[key] instanceof File) {
//        const file = this.filesInput.files[key];
        // check if this is an image:
        if (imageMimeTypes.indexOf(file.type) !== -1) {
          const reader = new FileReader();
          reader.readAsBinaryString(file);

          reader.onload = function() {
            axios.post('http://localhost:8095/users/1/posts', { image: btoa(reader.result) }, {
              onUploadProgress: progressEvent => {
                console.log('Upload Progress: ' + Math.round((progressEvent.loaded/progressEvent.total) * 100) + '%')
              }
            })
            .then(res => {
              console.log('res:', res);
            });
          };
          reader.onerror = function() {
              console.log('there are some problems');
          };
        }
//      }
//    }

//    this.handleImageUpload(files[0]);
//    this.fileUploadHandler();
  }

  /*
  fileUploadHandler = () => {
    console.log("uploadedFile", this.state.uploadedFile);
  }
 */

/*
  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }
*/

  render() {
    console.log("in render:", this.state.uploadedFile);
    return (
      <form>
        <div className="FileUpload">
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        </div>

        <div>
          {this.state.uploadedFile === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFile} />
          </div>}
        </div>
      </form>
    );
  }
}
