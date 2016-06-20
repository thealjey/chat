/* @flow */

import React, {Component, PropTypes, addons} from 'react/lib/ReactWithAddons';
import {findDOMNode} from 'react-dom';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import debounce from 'lodash/debounce';

/* eslint-disable require-jsdoc */

const {string, func} = PropTypes,
  delay = 500;

export default class Editor extends Component {

  static propTypes: Object;

  static contextTypes: Object;

  props: Object;

  context: Object;

  field: any;

  handleChange: () => void;

  setField: (field: any) => void;

  constructor(props: Object) {
    super(props);
    this.setField = this.setField.bind(this);
    this.handleChange = debounce(this.handleChange.bind(this), delay);
  }

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return addons.shallowCompare(this, props, state);
  }

  setField(field: any) {
    this.field = findDOMNode(field);
  }

  handleChange() {
    this.context.dispatch(this.props.action(this.field.value));
  }

  render(): any {
    const {label, value} = this.props;

    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <FormControl type="text" ref={this.setField} defaultValue={value} onChange={this.handleChange} />
      </FormGroup>
    );
  }

}

Editor.propTypes = {label: string, value: string, action: func};
Editor.contextTypes = {dispatch: func};
