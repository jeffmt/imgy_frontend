import React, { Component } from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import Header from './components/Header';
import Posts from './components/Posts';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      selectedFile: null
    }
  }

  componentWillMount(){
    this.getPosts();
  }

  getPosts() {
    axios.request({
        method: 'get',
        url: 'http://localhost:8095/posts',
    }).then((response) => {
      this.setState({posts: response.data}, () => {
        console.log(this.state);
      });
    }).catch((error) => {
        console.log(error);
    });
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile:event.target.files[0]
    });
  }

  fileUploadHandler = () => {
    const files = this.filesInput.files;

    var imageMimeTypes = ['image/jpg' , 'image/jpeg', 'image/png', 'image/bmp', 'image/gif'];

    for (var key in files) {
    // check if this is a file:
      if (files.hasOwnProperty(key) && files[key] instanceof File) {
        const file = this.filesInput.files[key];
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
              console.log(res);
            });
          };
          reader.onerror = function() {
              console.log('there are some problems');
          };

          /*
          console.log("key:", key);
          for (var key2 in files[key]) {
            console.log("key2:", key2, " value:", files[key][key2]);
            for (var key3 in files[key][key2]) {
              console.log("key3:", key3, " value:", files[key][key2][key3]);
            }
          }
          */
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <input
          type="file"
          ref={(input) => { this.filesInput = input; }}
          onChange={this.fileSelectedHandler}
          name="file"/>
        <button onClick={this.fileUploadHandler}>Upload</button>
        <Grid>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <Posts posts={this.state.posts}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
