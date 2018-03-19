import React, { Component } from 'react';
import {OverlayTrigger, Popover, Image} from 'react-bootstrap';

class Post extends Component {
  render() {
    let {id, description, image, views} = this.props.post;

    description = description || " ";

    const src = "data:image/jpg;base64," + image;

    const popover = (
      <Popover id={id} title={description}>
        {views} views
      </Popover>
    );

    const link = "/post/" + id;
    return (
      <div className="Post">
        <OverlayTrigger placement="left" overlay={popover}>
          <a href={link}><Image src={src} thumbnail /></a>
        </OverlayTrigger>
      </div>
    )
  }
}

export default Post;
