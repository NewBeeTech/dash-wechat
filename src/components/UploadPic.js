/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { ImagePicker } from 'antd-mobile';
import Upload from 'rc-upload';
import * as styles from './../assets/stylesheets/mine.css'

type Props = {
  photos: Array,
};

class UploadPic extends React.Component {
  constructor(props) {
    super(props);
    this.uploaderProps = {
      action: 'http://120.27.12.128:80/oss/sign',
      data: { a: 1, b: 2 },
      headers: {
        Authorization: 'xxxxxxx',
      },
      multiple: true,
      beforeUpload(file) {
        console.log('beforeUpload', file.name);
      },
      onStart: (file) => {
        console.log('onStart', file.name);
        // this.refs.inner.abort(file);
      },
      onSuccess(file) {
        console.log('onSuccess', file);
      },
      onProgress(step, file) {
        console.log('onProgress', Math.round(step.percent), file.name);
      },
      onError(err) {
        console.log('onError', err);
      },
    };
  }
  componentWillMount() {
  }
  props: Props;
  render() {
    return (
      <div className={styles.uploadPic}>
        <Upload {...this.uploaderProps} ref="inner">
          <div
            className={styles.uploadButton}
            style={this.props.photos[0] ? {background: `url(${this.props.photos[0]})`, backgroundSize: 'cover'} : {}}
          >
            {this.props.photos[0] ? '' : <img width="20%" src="./../assets/images/add_pic.png"/>}
          </div>
        </Upload>
        <div>
          <Upload {...this.uploaderProps} ref="inner">
            <div
              className={styles.uploadButton2}
              style={this.props.photos[1] ? {background: `url(${this.props.photos[1]})`, backgroundSize: 'cover'} : {}}
            >
              {this.props.photos[1] ? '' : <img width="20%" src="./../assets/images/add_pic.png"/>}
            </div>
          </Upload>
          <Upload {...this.uploaderProps} ref="inner">
            <div
              className={styles.uploadButton2}
              style={this.props.photos[2] ? {background: `url(${this.props.photos[2]})`, backgroundSize: 'cover', marginTop: '1vw'} : {marginTop: '1vw'}}
            >
              {this.props.photos[2] ? '' : <img width="20%" src="./../assets/images/add_pic.png"/>}
            </div>
          </Upload>
        </div>
      </div>
    );
  }
}

export default UploadPic;
