import React, { Component } from 'react';
import {Grid, Col, Row, Image, OverlayTrigger, Popover} from 'react-bootstrap';

class Posts extends Component {
  render() {
    let postItems;
    if(this.props.posts){
      postItems = this.props.posts.map(post => {
        let {id, description, image, views} = post;

        description = description || " ";

        const src = "data:image/jpg;base64," + image;

        const popover = (
          <Popover id={id} title={description}>
            {views} views
          </Popover>
        );
        return (
            <Col key={id} xs={12} md={4}>
              <OverlayTrigger placement="left" overlay={popover}>
                <a href="#"><Image src={src} thumbnail /></a>
              </OverlayTrigger>
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
