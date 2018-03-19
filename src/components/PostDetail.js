import React, { Component } from 'react';
import Header from './Header';
import ImageInfo from './ImageInfo';
import axios from 'axios';
import {Grid, Col, Row, Image, PageHeader} from 'react-bootstrap';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
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
      });
    }).catch((error) => {
        console.log(error);
    });
  }

  render() {
    const src = "data:image/jpg;base64," + this.state.post.image;
    const desc = this.state.post.description;

    return (
      <div>
      <Header />
        <Grid>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <PageHeader>{desc}</PageHeader>
              <Image src={src} thumbnail />
              <ImageInfo post={this.state.post} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default PostDetail;
