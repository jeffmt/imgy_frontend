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
      this.setState({posts: response.data});
    }).catch((error) => {
        console.log(error);
    });
  }

  handleSave(accepted, description) {
    const file = accepted[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      var self = this;

      reader.onload = function() {
        axios({
            method: 'post',
            url: 'http://localhost:8080/users/1/posts',
            data: { image: btoa(reader.result), description: description},
            config: {
              headers: {'Access-Control-Expose-Headers': 'location'}
            }
        })
        .then(function(response) {
          if (response.status === 201) {
            axios.request({
                method: 'get',
                url: 'http://localhost:8080/posts',
            }).then((response) => {
              if (response.data.length > 0) {
                self.setState((prevState, props) => {
                  return {
                    posts: [...self.state.posts, { id: response.data[response.data.length - 1].id, image: btoa(reader.result), description: description, views: 0}],
                    showForm: false,
                  }
                });
              }
            }).catch((error) => {
                console.log(error);
            });
          }
        });
      };
      reader.onerror = function() {
          console.log('there are some problems');
      };
    }
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
