import React, { Component } from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import Header from './components/Header';
import Posts from './components/Posts';
import PostInput from './components/PostInput';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      showForm: false
    }

    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount(){
    this.getPosts();
  }

  getPosts() {
    axios.request({
        method: 'get',
        url: 'http://localhost:8080/posts',
    }).then((response) => {
      this.setState({posts: response.data}, () => {
        console.log(this.state);
      });
    }).catch((error) => {
        console.log(error);
    });
  }

  handleSave(accepted, description) {
    console.log("accepted: ", accepted);
    const file = accepted[0];
    this.setState((prevState, props) => {
      return {
        posts: [...this.state.posts, file],
        showForm: false
      }
    });
//    console.log("newPost:", file);
//    console.log("state:", this.state);

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    // let base64 = btoa(reader.result);
    // console.log("base64:", base64);
    reader.onload = function() {
      axios.post('http://localhost:8080/users/1/posts', { image: btoa(reader.result), description: description}, {
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

  render() {
    const {posts} = this.state;
    const {showForm} = this.state;
    return (
      <div className="App">
        <Header onNewPost={() => this.setState({showForm: true})} />
          {
            showForm ?
            <PostInput
              onSave={this.handleSave}
              onClose={() => this.setState({showForm: false})}
            /> : null
          }
            <Grid>
              <Row>
              {
                posts ? (
                    <Col xs={12} md={12} lg={12}>
                      <Posts posts={posts}/>
                    </Col>
                ) : (
                  <div>Loading...</div>
                )
              }
              </Row>
            </Grid>
      </div>
    );
  }
}

export default App;
