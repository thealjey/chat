/* @flow */

import React, {Component, PropTypes, addons} from 'react/lib/ReactWithAddons';
import {findDOMNode} from 'react-dom';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import debounce from 'lodash/debounce';

/* eslint-disable require-jsdoc */

const {string, func, number} = PropTypes,
  delay = 500;

export default class Slider extends Component {

  static propTypes: Object;

  static contextTypes: Object;

  props: Object;

  context: Object;

  field: HTMLInputElement;

  handleChange: () => void;

  setField: (field: HTMLInputElement) => void;

  constructor(props: Object) {
    super(props);
    this.setField = this.setField.bind(this);
    this.handleChange = debounce(this.handleChange.bind(this), delay);
  }

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return addons.shallowCompare(this, props, state);
  }

  setField(field: HTMLInputElement) {
    this.field = findDOMNode(field);
  }

  handleChange() {
    this.context.dispatch(this.props.action(this.field.value));
  }

  render(): any {
    const {label, value} = this.props;

    return (
      <FormGroup>
        <ControlLabel>{label}: {value}px</ControlLabel>
        <input
          defaultValue={value}
          type="range"
          ref={this.setField}
          step="100"
          min="100"
          max="1000"
          onChange={this.handleChange}
        />
      </FormGroup>
    );
  }

}

Slider.propTypes = {label: string, value: number, action: func};
Slider.contextTypes = {dispatch: func};
