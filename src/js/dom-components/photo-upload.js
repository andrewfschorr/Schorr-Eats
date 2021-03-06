import React, { Component } from 'react';

class PhotoUpload extends Component {
    constructor(props) {
        super(props);
    }

    deleteAlreadyUploadedImg(imgName, i) {
        this.props.deleteAlreadyUploadedImg(imgName, i);
    }

    deleteImg(i) {
        this.props.removeImg(i);
    }

    handleChange(e) {
        const files = Array.from(e.target.files);
        const pFiles = files.map(file => {
            const reader = new FileReader();
            const readerP = new Promise((resolve, reject) => {
                reader.onloadend = () => {
                    resolve({ data: reader.result, file });
                };
            });
            reader.readAsDataURL(file);
            return readerP;
        });
        Promise.all(pFiles).then(imgs => {
            this.props.onDrop(imgs);
        });
    }

    render() {
        const imagesDirName = this.props.existingPhotos.imagesDirName;
        const existingImgs =
            imagesDirName && this.props.existingPhotos.imgs.length
                ? this.props.existingPhotos.imgs.map((existingImg, i) => (
                      <li key={existingImg} className="item-holder">
                          <img
                              className="item-image"
                              src={`/images/${imagesDirName}/${existingImg}`}
                          />
                          <svg
                              onClick={() => {
                                  this.deleteAlreadyUploadedImg(existingImg, i);
                              }}
                              xlinkHref="http://www.w3.org/2000/svg"
                              className="svg-icon"
                              viewBox="0 0 20 20">
                              <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z" />
                          </svg>
                      </li>
                  ))
                : [];

        const imgsToUpload = this.props.imgs.length
            ? this.props.imgs.map((imgInfo, i) => (
                  <li key={i} className="item-holder">
                      <img className="item-image" src={imgInfo.data} />
                      <svg
                          onClick={() => {
                              this.deleteImg(i);
                          }}
                          xlinkHref="http://www.w3.org/2000/svg"
                          className="svg-icon"
                          viewBox="0 0 20 20">
                          <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z" />
                      </svg>
                  </li>
              ))
            : [];

        const imgs = [].concat(existingImgs, imgsToUpload);
        return (
            <div className="photo-uploader">
                <div className="custom-file">
                    <input
                        name="uploads[]"
                        onChange={this.handleChange.bind(this)}
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                        Choose file
                    </label>
                </div>
                <ul className="images-list">
                    {imgs.length ? (
                        imgs
                    ) : (
                        <p className="no-photos">No images yet ️☹️, upload some! 😄</p>
                    )}
                </ul>
            </div>
        );
    }
}

export default PhotoUpload;
