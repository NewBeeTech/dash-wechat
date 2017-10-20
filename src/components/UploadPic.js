/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { Toast } from 'antd-mobile';
import Upload from 'rc-upload';
import * as styles from './../assets/stylesheets/mine.css'
import { UploadFileToOSS } from './../core/WS/WSHandler';


type Props = {
  photos: Array,
  setStatePhotos: Function,
};
class UploadPic extends React.Component {
  props: Props;
  beforeUploadFirst(file) {
    const result = UploadFileToOSS(file);
    alert(file.name);
    result.then(fileInfo => {
      if (fileInfo.fileURL) {
        const photos = this.props.photos;
        photos[0] = fileInfo.fileURL;
        alert(fileInfo.fileURL);
        // 上传成功的图片显示
        this.props.setStatePhotos(photos);
      } else {
        // 上传失败的图片显示
        Toast.info('上传失败，请稍后再试', 3);
      }
    });
  }
  beforeUploadSecond(file) {
    const result = UploadFileToOSS(file);
    result.then(fileInfo => {
      if (fileInfo.fileURL) {
        const photos = this.props.photos;
        photos[1] = fileInfo.fileURL;
        // 上传成功的图片显示
        this.props.setStatePhotos(photos);
      } else {
        // 上传失败的图片显示
        Toast.info('上传失败，请稍后再试', 3);
      }
    });
  }
  beforeUploadThird(file) {
    alert(`fileName: ${file.name}`);
    alert(`index: ${index}`);
    const result = UploadFileToOSS(file);
    result.then(fileInfo => {
      if (fileInfo.fileURL) {
        const photos = this.props.photos;
        photos[2] = fileInfo.fileURL;
        // 上传成功的图片显示
        this.props.setStatePhotos(photos);
      } else {
        // 上传失败的图片显示
        Toast.info('上传失败，请稍后再试', 3);
      }
    });
  }
  renderUpload(index) {
    return (
      <div>

      </div>
    )
  }
  render() {
    // const uploadProps = {
    //   beforeUpload: (file) => {
    //     const result = UploadFileToOSS(file);
    //     alert(file.name);
    //     result.then(fileInfo => {
    //       if (fileInfo.fileURL) {
    //         alert(this);
    //         const photos = this.props.photos;
    //         photos[0] = fileInfo.fileURL;
    //         alert(fileInfo.fileURL);
    //         // 上传成功的图片显示
    //         this.props.setStatePhotos(photos);
    //       } else {
    //         // 上传失败的图片显示
    //         Toast.info('上传失败，请稍后再试');
    //       }
    //     });
    //   }
    // }
    const handleChange = (event, index) => {
      const file =  event.target.files[0];
      const result = UploadFileToOSS(file);
      if((file.type).indexOf("image/") === -1){
        return Toast.info("请上传图片", 2);
      }
      result.then(fileInfo => {
        if (fileInfo.fileURL) {
          const photos = this.props.photos;
          photos[index] = fileInfo.fileURL;
          // 上传成功的图片显示
          this.props.setStatePhotos(photos);
        } else {
          // 上传失败的图片显示
          Toast.info('上传失败，请稍后再试', 3);
        }
      });
    };
    return (
      <div className={styles.uploadPic}>
        <div
          className={styles.uploadButton}
          style={this.props.photos[0] ? {backgroundSize: 'contain', backgroundRepeat: 'no-repeat',  backgroundImage: `url(${this.props.photos[0]})`, backgroundPosition: 'center center' } : {}}
        >
          {this.props.photos[0] ? '' : <img width="20%" src="http://dash.oss-cn-beijing.aliyuncs.com/fe/add_pic.png"/>}
          <input type="file" accept="" onChange={(e) => handleChange(e, 0)} />
        </div>
        {/* <Upload { ...uploadProps } ref="inner">
          <div
            className={styles.uploadButton}
            style={this.props.photos[0] ? {backgroundSize: 'contain', backgroundRepeat: 'no-repeat',  backgroundImage: `url(${this.props.photos[0]})`, backgroundPosition: 'center center' } : {}}
          >
            {this.props.photos[0] ? '' : <img width="20%" src="http://dash.oss-cn-beijing.aliyuncs.com/fe/add_pic.png"/>}
          </div>
        </Upload> */}
        <div>
          {/* <Upload beforeUpload={(file) => this.beforeUploadSecond(file)} ref="inner"> */}
            <div
              className={styles.uploadButton2}
              style={this.props.photos[1] ? {backgroundSize: 'contain', backgroundRepeat: 'no-repeat',  backgroundImage: `url(${this.props.photos[1]})`, backgroundPosition: 'center center'} : {}}
            >
              {this.props.photos[1] ? '' : <img width="20%" src="http://dash.oss-cn-beijing.aliyuncs.com/fe/add_pic.png"/>}
              <input type="file" accept="" onChange={(e) => handleChange(e, 1)} />
            </div>
          {/* </Upload> */}
          {/* <Upload beforeUpload={(file) => this.beforeUploadThird(file)} ref="inner"> */}
            <div
              className={styles.uploadButton2}
              style={this.props.photos[2] ? {backgroundSize: 'contain', backgroundRepeat: 'no-repeat',  backgroundImage: `url(${this.props.photos[2]})`, backgroundPosition: 'center center', top: '1vw'} : {top: '1vw'}}
            >
              {this.props.photos[2] ? '' : <img width="20%" src="http://dash.oss-cn-beijing.aliyuncs.com/fe/add_pic.png"/>}
              <input type="file" accept="" onChange={(e) => handleChange(e, 2)} />
            </div>
          {/* </Upload> */}
        </div>
      </div>
    );
  }
}

export default UploadPic;
