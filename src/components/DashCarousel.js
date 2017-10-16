/* @flow */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import { Carousel } from 'antd-mobile';
import * as styles from '../assets/stylesheets/dashList.css';

class DashCarousel extends React.Component {
  static propTypes = {
    carousel: PropTypes.instanceOf(Immutable.List).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
    };
  }
  render() {
    const showImg = (data) => {
      const views = [];
      if(data) {
        this.props.carousel.map((v, k) => {
          views.push(
            <a href={v.get('url') || "javascript:void(0)"} key={k}>
              <img src={v.get('img')} className={styles.CarouselImg} />
            </a>
          );
        });
      }
      return views;
    }
    const showImgs = (carousel) => {
      const views = [];
      if(carousel.toJS().length > 1) {
        views.push(
          <Carousel
              className="my-carousel"
              autoplay
              infinite
              selectedIndex={this.state.selectedIndex}
              swipeSpeed={35}
            >
              {showImg(this.props.carousel)}
            </Carousel>
          );
      }else if(carousel.toJS().length == 1) {
          views.push(
            <div>
              <img src={carousel.toJS()[0].img} className={styles.CarouselImg} />
            </div>
          );
      }
      return views;
    }

    return (
      <div className={styles.carousel}>
        {showImgs(this.props.carousel)}
      </div>
    );
  }
}

export default DashCarousel;
