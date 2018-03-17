import React, { Component } from 'react';
import {Image, OverlayTrigger, Popover} from 'react-bootstrap';

class Post extends Component {
  render() {
    let {id, description, image, views} = this.props;

    description = description || " ";

    const src = "data:image/jpg;base64," + image;

    const popover = (
      <Popover id={id} title={description}>
        {views} views
      </Popover>
    );

    return (
      <div className="Post">
        <OverlayTrigger placement="left" overlay={popover}>
          <a href="/post"><Image src={src} thumbnail /></a>
        </OverlayTrigger>
      </div>
    )
  }
}

export default Post;
