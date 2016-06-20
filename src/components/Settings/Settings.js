/* @flow */

import React, {Component, PropTypes, addons} from 'react/lib/ReactWithAddons';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import {setActiveSettingsPanel, setImageWidth, setImageHeight, setNickname} from '../../actions';
import Slider from './Slider';
import Editor from './Editor';

/* eslint-disable require-jsdoc */

const {string, func, number} = PropTypes;

export default class Settings extends Component {

  static propTypes: Object;

  static contextTypes: Object;

  props: Object;

  context: Object;

  handleSelect: (key: string) => void;

  constructor(props: Object) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return addons.shallowCompare(this, props, state);
  }

  handleSelect(key: string) {
    this.context.dispatch(setActiveSettingsPanel(key));
  }

  render(): any {
    const {activePanel, imageWidth, imageHeight, nickname} = this.props;

    return (
      <Accordion className="application-tab settings-tab" onSelect={this.handleSelect} activeKey={activePanel}>
        <Panel header="Photo settings" eventKey="1">
          <Slider label="Width" value={imageWidth} action={setImageWidth} />
          <Slider label="Height" value={imageHeight} action={setImageHeight} />
        </Panel>
        <Panel header="Chat settings" eventKey="2">
          <Editor label="Nickname" value={nickname} action={setNickname} />
        </Panel>
      </Accordion>
    );
  }

}

Settings.propTypes = {activePanel: string, imageWidth: number, imageHeight: number, nickname: string};
Settings.contextTypes = {dispatch: func};
