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
        Toast.info('上传失败，请稍后再试');
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
        Toast.info('上传失败，请稍后再试');
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
        Toast.info('上传失败，请稍后再试');
      }
    });
  }
  render() {
    const uploadProps = {
      beforeUpload: (file) => {
        const result = UploadFileToOSS(file);
        alert(file.name);
        result.then(fileInfo => {
          if (fileInfo.fileURL) {
            alert(this);
            const photos = this.props.photos;
            photos[0] = fileInfo.fileURL;
            alert(fileInfo.fileURL);
            // 上传成功的图片显示
            this.props.setStatePhotos(photos);
          } else {
            // 上传失败的图片显示
            Toast.info('上传失败，请稍后再试');
          }
        });
      }
    }
    return (
      <div className={styles.uploadPic}>
        <Upload { ...uploadProps } ref="inner">
          <div
            className={styles.uploadButton}
            style={this.props.photos[0] ? {backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  backgroundImage: `url(${this.props.photos[0]})` } : {}}
          >
            {this.props.photos[0] ? '' : <img width="20%" src="http://dash.oss-cn-beijing.aliyuncs.com/fe/add_pic.png"/>}
          </div>
        </Upload>
        <div>
          <Upload beforeUpload={(file) => this.beforeUploadSecond(file)} ref="inner">
            <div
              className={styles.uploadButton2}
              style={this.props.photos[1] ? {backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  backgroundImage: `url(${this.props.photos[1]})`} : {}}
            >
              {this.props.photos[1] ? '' : <img width="20%" src="http://dash.oss-cn-beijing.aliyuncs.com/fe/add_pic.png"/>}
            </div>
          </Upload>
          <Upload beforeUpload={(file) => this.beforeUploadThird(file)} ref="inner">
            <div
              className={styles.uploadButton2}
              style={this.props.photos[2] ? {backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  backgroundImage: `url(${this.props.photos[2]})`, marginTop: '1vw'} : {marginTop: '1vw'}}
            >
              {this.props.photos[2] ? '' : <img width="20%" src="http://dash.oss-cn-beijing.aliyuncs.com/fe/add_pic.png"/>}
            </div>
          </Upload>
        </div>
      </div>
    );
  }
}

export default UploadPic;
