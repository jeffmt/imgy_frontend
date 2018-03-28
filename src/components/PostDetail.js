import React, { Component } from 'react';
import Header from './Header';
import ImageInfo from './ImageInfo';
import axios from 'axios';
import {Grid, Col, Row, Image, PageHeader, ButtonToolbar, Button} from 'react-bootstrap';
import '../styles/PostDetail.css';

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
        url: 'http://localhost:8080/posts',
    }).then((response) => {
      let post_array = response.data.map((post, index, array) => {
        if (index === 0 && index === array.length - 1) {
          return ({...post});
        }
        else if (index === 0) {
          return ({...post, next_post_id: array[index + 1].id});
        }
        else if (index === array.length - 1) {
          return ({...post, prev_post_id: array[index - 1].id});
        }
        else {
          return ({...post, prev_post_id: array[index - 1].id, next_post_id: array[index + 1].id});
        }
      }).filter(val => {
        return val.id === Number(this.props.match.params.id);
      });
      if (post_array.length === 1) {
        this.setState({post: post_array[0]});
      }
    }).catch((error) => {
        console.log(error);
    });
  }

  render() {
    const {id, next_post_id, prev_post_id, image, description} =  this.state.post;
    const src = "data:image/jpg;base64," + image;

    let next_button = null;
    if ( next_post_id !== undefined ) {
      const link = "/post/" + next_post_id;
      next_button =
          <Button bsStyle="primary" href={link}>
            Next Post &gt;
          </Button>;
    }

    let prev_button = null;
    if ( prev_post_id !== undefined ) {
      const link = "/post/" + prev_post_id;
      prev_button =
        <Button href={link} >
          &lt;
        </Button>;
    }

    let contents = null;
    if (next_post_id !== undefined || prev_post_id !== undefined) {
      contents =
      <div>
              <PageHeader><small>{description}</small></PageHeader>
              <ButtonToolbar>
              {prev_button}
              {next_button}
              </ButtonToolbar>
              <Image src={src} rounded />
              <ImageInfo post={this.state.post} />;
      </div>
    }
    else {
      contents =
      <div>
              <PageHeader><small>{description}</small></PageHeader>
              <Image src={src} rounded />
              <ImageInfo post={this.state.post} />;
      </div>
    }

    return (
      <div>
        <Header />
        <Grid>
          <Row>
            <Col xs={12} md={12} lg={12}>
              {
                id ?
                contents :
                null
              }
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default PostDetail;
