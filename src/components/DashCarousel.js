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
        this.props.carousel.map((v, k) => (
          views.push(
            <div className={styles.CarouselImg} key={k}
               onClick={() => Window.open(v.get('url'))}
            >
              <img src={v.get('img')} width="100%" height="100%" />
            </div>
          )
        ))
      }
      return views;
    }
    return (
      <div className={styles.carousel}>
        <Carousel
            className="my-carousel"
            autoplay
            infinite
            selectedIndex={this.state.selectedIndex}
            swipeSpeed={35}
          >
            {showImg(this.props.carousel)}
          </Carousel>
        </div>
    );
  }
}

export default DashCarousel;
