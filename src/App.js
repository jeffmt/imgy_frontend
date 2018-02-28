import React, { Component } from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import Header from './components/Header';
import Posts from './components/Posts';
import axios from 'axios';
import base64 from 'base-64';
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
    //console.log(event.target.files[0]);
    this.setState({
      selectedFile:event.target.files[0]
    });
  }

  fileUploadHandler = () => {
    const formData = new FormData();

    const files = this.filesInput.files;

//    const encoded;
    for (var key in files) {
    // check if this is a file:
      if (files.hasOwnProperty(key) && files[key] instanceof File) {
        console.log("key:", key, " value:", base64.encode(files[key]));

        formData.append(key, base64.encode(files[key]));
//        encoded = base64.encode(files[key]);
      }
    }

  //  fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
  //  axios.post('http://localhost:8095/users/1/posts', formData, {
    axios.post('http://localhost:8095/users/1/posts', {image: base64.encode(this.filesInput.files[0])}, {
      onUploadProgress: progressEvent => {
        console.log('Upload Progress: ' + Math.round((progressEvent.loaded/progressEvent.total) * 100) + '%')
      }
    })
    .then(res => {
      console.log(res);
    });
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
