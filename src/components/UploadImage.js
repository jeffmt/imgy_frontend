import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios'

export default class UploadImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: ''
    };
  }

  onImageDrop(files) {
    const file = files[0];

console.log("onImageDrop:", file);
    this.setState(() => {
      return {
        uploadedFile: file
      };
    });
console.log("onImageDrop2:", this.state.uploadedFile);

    var imageMimeTypes = ['image/jpg' , 'image/jpeg', 'image/png', 'image/bmp', 'image/gif'];

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
  }

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
