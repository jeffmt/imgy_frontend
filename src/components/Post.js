import React, { Component } from 'react';
import {OverlayTrigger, Popover, Image} from 'react-bootstrap';
import axios from 'axios';

class Post extends Component {
  constructor(props) {
    super(props);

    this.incrementViews = this.incrementViews.bind(this);
  }

  incrementViews() {
    axios.request({
        method: 'put',
        url: 'http://localhost:8080/posts/' + this.props.post.id,
    }).catch((error) => {
        console.log(error);
    });
  }

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
          <a href={link} onClick={this.incrementViews}><Image src={src} thumbnail /></a>
        </OverlayTrigger>
      </div>
    )
  }
}

export default Post;
