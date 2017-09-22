/* @flow */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import { Carousel } from 'antd-mobile';

class DashCarousel extends React.PureComponent {
  static propTypes = {
    carousel: PropTypes.instanceOf(Immutable.List).isRequired,
  };
  componentWillMount() {
    // this.props.dispatch(
    //   DashListAction.getDashListData()
    // );
  }
  
  
  render() {
    const showImg = ($data) => {
      const views = [];
      if($data) {
        this.props.carousel.map(($v, $k) => (
          views.push(
            <a href="http://www.baidu.com" key={$k} style={200}>
              <img
                src={$v}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                  this.setState({
                   initialHeight: null,
                 });
                }}
              />
            </a>
          )
        ))
      }
      return views;
    }
    return (
      <Carousel
        className="my-carousel"
        autoplay={true}
        infinite={true}
        selectedIndex={1}
        swipeSpeed={35}
        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        // afterChange={index => console.log('slide to', index)}
      >
        {showImg(this.props.carousel)}
      </Carousel>
    );
  }
}

export default DashCarousel;
