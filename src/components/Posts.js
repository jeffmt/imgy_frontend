import React, { Component } from 'react';
import {Grid, Col, Row, Image} from 'react-bootstrap';

class Posts extends Component {
  render() {
    let postItems;
    if(this.props.posts){
      postItems = this.props.posts.map(post => {
        let id = post.id;
        //let src = atob(post.image);
        const src = "data:image/jpg;base64," + post.image;

        console.log("post.image", post.image);
        return (
            <Col xs={12} md={4}>
              <Image src={src} thumbnail />
            </Col>
        );
      });
    }
    return (
      <div>
        <Grid>
          <Row>
            {postItems}
          </Row>
        </Grid>;
      </div>
    );
  }
}

export default Posts;
