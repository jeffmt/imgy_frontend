import React, { Component } from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import Post from './Post';

class Posts extends Component {
  render() {
    let postItems;
    if(this.props.posts){
      postItems = this.props.posts.map(post => {
        return (
            <Col key={post.id} xs={12} md={4}>
                <Post post={post} />
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
        </Grid>
      </div>
    );
  }
}

export default Posts;
