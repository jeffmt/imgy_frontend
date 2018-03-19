import React, { Component } from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import Header from './components/Header';
import Posts from './components/Posts';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
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

  render() {
    const {posts} = this.state
    return (
      <div className="App">
        <Header />
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
