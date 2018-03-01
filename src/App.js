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
    const file = this.filesInput.files[0];
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
