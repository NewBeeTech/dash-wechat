/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { ImagePicker } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'

type Props = {
  avator: string,
  wxPortrait: string,
  wxName: string,
  likeCount: number,
  onclikHandler: func,
};
const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];

class UploadPic extends React.Component {
  state = {
    files: data,
  }
  componentWillMount() {
  }
  props: Props;
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  render() {
    const { files } = this.state;
    return (
      <div className={styles.uploadPic}>
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 3}
        />
      </div>
    );
  }
}

export default UploadPic;
