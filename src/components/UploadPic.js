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
};
type state = {
  photos: Array,
};
class UploadPic extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.setState({
      photos: this.props.photos,
    });
  }
  props: Props;
  beforeUpload(file, index) {
    console.log('beforeUpload', file, index);
    const result = UploadFileToOSS(file);
    result.then(fileInfo => {
      console.log(fileInfo);
      if (fileInfo.fileURL) {
        const photos = this.state.photos;
        photos[index] = fileInfo.fileURL;
        // 上传成功的图片显示
        this.setState({
          photos,
        });
        console.log(this.state.photos);
      } else {
        // 上传失败的图片显示
        Toast.info('上传失败，请稍后再试');
      }
    });
  }
  render() {
    return (
      <div className={styles.uploadPic}>
        <Upload beforeUpload={(file) => this.beforeUpload(file, 0)} ref="inner">
          <div
            className={styles.uploadButton}
            style={this.state.photos[0] ? {background: `url(${this.state.photos[0]})`, backgroundSize: 'cover'} : {}}
          >
            {this.state.photos[0] ? '' : <img width="20%" src="./../assets/images/add_pic.png"/>}
          </div>
        </Upload>
        <div>
          <Upload beforeUpload={(file) => this.beforeUpload(file, 1)} ref="inner">
            <div
              className={styles.uploadButton2}
              style={this.state.photos[1] ? {background: `url(${this.state.photos[1]})`, backgroundSize: 'cover'} : {}}
            >
              {this.state.photos[1] ? '' : <img width="20%" src="./../assets/images/add_pic.png"/>}
            </div>
          </Upload>
          <Upload beforeUpload={(file) => this.beforeUpload(file, 2)} ref="inner">
            <div
              className={styles.uploadButton2}
              style={this.state.photos[2] ? {background: `url(${this.state.photos[2]})`, backgroundSize: 'cover', marginTop: '1vw'} : {marginTop: '1vw'}}
            >
              {this.state.photos[2] ? '' : <img width="20%" src="./../assets/images/add_pic.png"/>}
            </div>
          </Upload>
        </div>
      </div>
    );
  }
}

export default UploadPic;
