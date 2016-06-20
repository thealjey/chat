/* @flow */

import React, {Component, PropTypes, addons} from 'react/lib/ReactWithAddons';
import Carousel from 'react-bootstrap/lib/Carousel';
import type {CarouselEvent} from '../../typedef';
import {setCarouselSlide} from '../../actions';

/* eslint-disable require-jsdoc */

const {string, number, func} = PropTypes;

export default class Photos extends Component {

  static propTypes: Object;

  static contextTypes: Object;

  props: Object;

  context: Object;

  handleSelect: (index: number, e: CarouselEvent) => void;

  static renderSlides(width: number, height: number): Array<any> {
    const slides = [],
      len = 5;

    for (let i = 0; i < len; ++i) {
      slides.push(
        <Carousel.Item key={i}>
          <img src={`/images/${width}/${height}/${i}.jpg`} />
        </Carousel.Item>
      );
    }

    return slides;
  }

  constructor(props: Object) {
    super(props);

    // can't use `bind` because `Carousel` checks the function length
    this.handleSelect = (index, e) => this.doHandleSelect(index, e);
  }

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return addons.shallowCompare(this, props, state);
  }

  doHandleSelect(index: number, e: CarouselEvent) {
    this.context.dispatch(setCarouselSlide(index, e.direction));
  }

  render(): any {
    const {index, direction, width, height} = this.props;

    return (
      <div className="application-tab photos-tab">
        <Carousel style={{width, height}} activeIndex={index} direction={direction} onSelect={this.handleSelect}>
          {Photos.renderSlides(width, height)}
        </Carousel>
      </div>
    );
  }

}

Photos.propTypes = {index: number, direction: string, width: number, height: number};
Photos.contextTypes = {dispatch: func};
