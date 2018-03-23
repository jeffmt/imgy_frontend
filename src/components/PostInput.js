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
//    this.onDrop = this.onDrop.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
//    this.props.onSave({...this.state.accepted[0]});
    this.props.onSave(this.state.accepted, this.state.description);
    this.setState({
      accepted: [],
      rejected: [],
      description: ""
    })

    // this.setState({
    //   description: "",
    //   image: ""
    // })
  }

//   onDrop(accepted, rejected) {
// //    if (accepted.length === 1 && rejected.length === 0) {
//       this.setState({ accepted, rejected });
// //    }
//   }

  render() {
    const {onClose} = this.props;
console.log("state:", this.state);
//    const {newPosts} = this.state;
//    const newPosts = this
            // onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}

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
// class PostInput extends Component {
//   static defaultProps = {
//     onSave() {},
//     onClose() {}
//   }
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       file: "",
//       description: "",
//     }
// /*
//     this.state = {
//       newPosts: [{
//         file: ""
//         description: ""
//       }]
//     }
//     */
//     /*
//     this.state = {
//       accepted: [],
//       rejected: []
//     }
//     this.state = {
//       files: []
//     }
//     */
//
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.onDrop= this.onDrop.bind(this);
//   }
//
//   /*
//   constructor(props) {
//     super(props);
//     this.state = {
//       description: "",
//       image: ""
//     }
//
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   */
//
//   handleChange(e) {
//     this.setState({[e.target.name]: e.target.value});
//   }
//
//   handleSubmit(e) {
//     e.preventDefault();
//     this.props.onSave({...this.state});
//     this.setState({
//       description: "",
//       image: ""
//     })
//
//   }
//
//   onImageDrop(file) {
//     console.log("accepted:", file);
//     this.setState(() => {
//       const newPost = {...file};
//       return {
//         newPosts: [...this.state.newPosts, newPost]
//       }
//     });
//   }
//
// /*
//     let np = newPosts.map((post, i) => (
//           <div className='image-form-line' key={`post-${i}`}>
//               <Dropzone
//                 multiple={false}
//                 accept="image/*"
//                 onDrop={this.onImageDrop}>
//               >
//                 <p>Drag and drop an image file or click to select one to upload.</p>
//                 <p>Only image files will be accepted</p>
//               </Dropzone>
//               {
//                 this.state.accepted.length > 0 ?
//                 <div>
//                 <p>File:</p>
//                 <ul>
//                   {
//                     this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size/1000} KB</li>)
//                   }
//                 </ul>
//                 </div>
//                 : null
//               }
//               <label>Description
//               <input
//                 name={`description-${i}`}
//                 type='text'
//                 value={post.description}
//                 size={42}
//                 autoComplete="off"
//                 onChange={this.handleChange}/>
//               </label>
//             </div>
//     ));
// */
//   render() {
//     const {onClose} = this.props;
// console.log("state:", this.state);
//     const {newPosts} = this.state;
//     const newPosts = this
//
//     return (
//       <div className="post-form-container">
//         <form className='post-form' onSubmit={this.handleSubmit}>
//         <button
//             type="button"
//             className="close-button"
//             onClick={onClose}
//           >
//             X
//             {}
//             {np}
//           </button>
//             <button
//               type="submit"
//               className="buttons"
//               style={{alignSelf: 'flex-end', marginRight: 0}}
//             >
//               SAVE
//             </button>
//         </form>
//       </div>
//     );
//     /*
//
//           <div className='image-form-line'>
//               <Dropzone
//                 multiple={false}
//                 accept="image/*"
//                 onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
//               >
//                 <p>Drag and drop image(s) or click to select images(s) to upload.</p>
//                 <p>Only image files will be accepted</p>
//               </Dropzone>
//               {
//                 this.state.accepted.length > 0 ?
//                 <div>
//                 <p>Accepted files</p>
//                 <ul>
//                   {
//                     this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size/1000} KB</li>)
//                   }
//                 </ul>
//                 </div>
//                 : null
//               }
//               {
//                 this.state.rejected.length > 0 ?
//                 <div>
//                 <p>Rejected files</p>
//                 <ul>
//                   {
//                     this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size/1000} KB</li>)
//                   }
//                 </ul>
//                 </div>
//                 : null
//               }
//               <label htmlFor='description-input'>Description</label>
//               <input
//                 id='description-input'
//                 name='description'
//                 type='text'
//                 size={42}
//                 autoComplete="off"
//                 onChange={this.handleChange}/>
//
//             </div>
//     */
// /*
//     return (
//       <div className="post-form-container">
//         <form className='post-form' onSubmit={this.handleSubmit}>
//         <button
//             type="button"
//             className="close-button"
//             onClick={onClose}
//           >
//             X
//           </button>
//           <div className='image-form-line'>
//               <Dropzone
//                 multiple={true}
//                 accept="image/*"
//                 onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
//               >
//                 <p>Drag and drop image(s) or click to select images(s) to upload.</p>
//                 <p>Only image files will be accepted</p>
//               </Dropzone>
//               {
//                 this.state.accepted.length > 0 ?
//                 <div>
//                 <p>Accepted files</p>
//                 <ul>
//                   {
//                     this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size/1000} KB</li>)
//                   }
//                 </ul>
//                 </div>
//                 : null
//               }
//               {
//                 this.state.rejected.length > 0 ?
//                 <div>
//                 <p>Rejected files</p>
//                 <ul>
//                   {
//                     this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size/1000} KB</li>)
//                   }
//                 </ul>
//                 </div>
//                 : null
//               }
//               <label htmlFor='description-input'>Description</label>
//               <input
//                 id='description-input'
//                 name='description'
//                 type='text'
//                 size={42}
//                 autoComplete="off"
//                 onChange={this.handleChange}/>
//
//             </div>
//             <button
//               type="submit"
//               className="buttons"
//               style={{alignSelf: 'flex-end', marginRight: 0}}
//             >
//               SAVE
//             </button>
//         </form>
//       </div>
//     );
//     */
//   }
// /*
//   render() {
//     const {onClose} = this.props;
//     return (
//       <div className="post-form-container">
//         <form className='post-form' onSubmit={this.handleSubmit}>
//         <button
//             type="button"
//             className="close-button"
//             onClick={onClose}
//           >
//             X
//           </button>
//           <div className='image-form-line'>
//               <label htmlFor='image-file-input'>Image File</label>
//               <input
//                 id='image-file-input'
//                 name='image'
//                 type='file'
//                 value=''
//                 size={42}
//                 autoComplete="off"
//                 onChange={this.handleChange}/>
//
//               <label htmlFor='description-input'>Description</label>
//               <input
//                 id='description-input'
//                 name='description'
//                 type='text'
//                 value=''
//                 size={42}
//                 autoComplete="off"
//                 onChange={this.handleChange}/>
//
//             </div>
//             <button
//               type="submit"
//               className="buttons"
//               style={{alignSelf: 'flex-end', marginRight: 0}}
//             >
//               SAVE
//             </button>
//         </form>
//       </div>
//     );
//   }
//   */
// }

export default PostInput;
