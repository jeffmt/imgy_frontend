import React, { Component } from 'react';
import {Image} from 'react-bootstrap';
import Header from './Header';
import axios from 'axios';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: []
    }
  }

  componentWillMount(){
    this.getPost();
  }

  getPost() {
    axios.request({
        method: 'get',
        url: 'http://localhost:8080/posts/' +  this.props.match.params.id,
    }).then((response) => {
      this.setState({post: response.data}, () => {
        console.log("after set state:",this.state);
      });
    }).catch((error) => {
        console.log(error);
    });
  }

  render() {
    const src = "data:image/jpg;base64," + this.state.post.image;
    return (
      <div>
      <Header />
      <Image src={src} thumbnail />
      </div>
    )
  }
}

export default PostDetail;
