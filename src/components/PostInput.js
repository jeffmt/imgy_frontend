import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import '../styles/PostInput.css';

class PostInput extends Component {
  static defaultProps = {
    onSave() {},
    onClose() {}
  }

  constructor(props) {
    super(props);

    this.state = {
      accepted: [],
      rejected: [],
      description: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave(this.state.accepted, this.state.description);
    this.setState({
      accepted: [],
      rejected: [],
      description: ""
    })
  }

  render() {
    const {onClose} = this.props;

    return (
      <div className="post-form-container">
        <form className='post-form' onSubmit={this.handleSubmit}>
        <button
            type="button"
            className="close-button"
            onClick={onClose}
          >
            X
          </button>
          <Dropzone
            multiple={true}
            accept="image/*"
            onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
          >
            <p>Drag and drop an image or click to select image to upload.</p>
            <p>Only images will be accepted</p>
          </Dropzone>
          {
            this.state.accepted.length > 0 ?
            <p>{this.state.accepted[0].name}</p>
            : null
          }
          {
            this.state.accepted.length > 1 ?
            <p>(Can only upload 1 image at a time)</p>
            : null
          }
          {
            this.state.rejected.length > 0 ?
            <div>
              <p>Cannot use these files because they do not appear to be images:</p>
              <ul>
                {
                  this.state.rejected.map(f => <li key={f.name}>{f.name}</li>)
                }
              </ul>
            </div>
            : null
          }
          <label>Description
          <input
            id='description-input'
            name='description'
            type='text'
            size={42}
            autoComplete="off"
            onChange={this.handleChange}/>
          </label>
          <button
            type="submit"
            className="buttons"
            style={{alignSelf: 'flex-end', marginRight: 0}}
          >
            SAVE
          </button>
        </form>
      </div>
    );
  }
}

export default PostInput;
