import React, { Component } from "react";

export default class ImageButton extends Component {
  constructor(props) {
    super(props);

    this.inputFileRef = React.createRef();
  }

  onAddImage = async e => {
    try {
      const formData = new FormData();
      const files = Array.from(e.target.files);
      formData.append("file", files[0]);

      const fakeUpload = new Promise(function(resolve, reject) {
        setTimeout(function() {
          const data = {
            url: 'https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg'
          }
          resolve(data);
        }, 300);
      });

      const image = await fakeUpload;
      this.props.onAddImage(image.url);
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line
      alert(`Error: ${error.data}`);
    }
  };

  onInputClick = () => this.inputFileRef.current.click();

  preventBubblingUp = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div onMouseDown={this.preventBubblingUp} role="button" tabIndex="0">
        <button
          size="small"
          onClick={this.onInputClick}
          style={{ marginLeft: "3px" }}
        >
          {/* <i className="fa fa-image" /> */}
          Upload
          <input
            ref={this.inputFileRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={this.onAddImage}
            style={{ display: "none" }}
          />
        </button>
      </div>
    );
  }
}
