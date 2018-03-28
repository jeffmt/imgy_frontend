import React, { Component } from 'react';
import {Badge} from 'react-bootstrap'
import '../styles/ImageInfo.css';

class ImageInfo extends Component {
  render() {
    let {views, points} = this.props.post;

    return (
    <div className="image-info">
      <Badge>
        {views}
      </Badge> views
      <Badge>
        {points}
      </Badge> points
    </div>
    )
  }
}

export default ImageInfo;
