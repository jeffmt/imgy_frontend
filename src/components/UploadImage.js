import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Header from './Header';
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

    this.setState(() => {
      return {
        uploadedFile: file
      };
    });

    // check if image file uploaded:
    if (file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = function() {
        axios.post('http://localhost:8080/users/1/posts', { image: btoa(reader.result) }, {
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
      <div>
        <Header />
        <form>
          <div style={{display: 'flex', justifyContent: 'center'}} >
            <Dropzone
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}>
              <p>Drop an image or click to select a file to upload.</p>
            </Dropzone>
          </div>

          <div style={{display: 'flex', justifyContent: 'center'}} >
            {
              this.state.uploadedFile === '' ?
              null
              :
              this.state.uploadedFile !== undefined ?
              <div>
                <p>{this.state.uploadedFile.name} Uploaded!</p>
              </div>
              :
              <div>
                <p>Please try again with an image file</p>
              </div>
            }
          </div>
        </form>
      </div>
    );
  }
}
