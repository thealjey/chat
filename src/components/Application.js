/* @flow */

import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Tab from 'react-bootstrap/lib/Tab';
import Chat from './Chat';
import Photos from './Photos';
import Settings from './Settings';
import {setActiveTab} from '../actions';

/* eslint-disable require-jsdoc */

const {instanceOf, func} = PropTypes,
  defaultSize = 500;

export default class Application extends Component {

  static propTypes: Object;

  static childContextTypes: Object;

  props: Object;

  handleSelect: (key: string) => void;

  constructor(props: Object) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  shouldComponentUpdate(props: Object): boolean {
    return props.state !== this.props.state;
  }

  getChildContext() {
    return {dispatch: this.props.dispatch};
  }

  handleSelect(key: string) {
    this.props.dispatch(setActiveTab(key));
  }

  render(): any {
    const {state} = this.props,
      errors = state.get('errors'),
      activeTab = state.get('active_tab', 'chat'),
      activeSettingsPanel = state.get('active_settings_panel', '1'),
      imageWidth = state.get('image_width', defaultSize),
      imageHeight = state.get('image_height', defaultSize),
      nickname = state.get('nickname', ''),
      carouselIndex = state.get('carousel_index', 0),
      carouselDirection = state.get('carousel_direction', null),
      messages = state.get('messages'),
      unreadMessages = state.get('unread_messages', false),
      chatActive = 'chat' === activeTab;

    return (
      <Tab.Container id="application-tab-panel" onSelect={this.handleSelect} activeKey={activeTab}>
        <div>
          <Nav bsStyle="tabs" justified>
            <NavItem eventKey="chat" className={unreadMessages && !chatActive ? 'animateTab' : ''}>Chat</NavItem>
            <NavItem eventKey="photos">Photos</NavItem>
            <NavItem eventKey="settings">Settings</NavItem>
          </Nav>
          <Tab.Content animation>
            <Tab.Pane eventKey="chat">
              <Chat active={chatActive} errors={errors} nickname={nickname} messages={messages} />
            </Tab.Pane>
            <Tab.Pane eventKey="photos">
              <Photos index={carouselIndex} direction={carouselDirection} width={imageWidth} height={imageHeight} />
            </Tab.Pane>
            <Tab.Pane eventKey="settings">
              <Settings
                activePanel={activeSettingsPanel}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                nickname={nickname}
              />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    );
  }

}

Application.propTypes = {state: instanceOf(Map), dispatch: func};
Application.childContextTypes = {dispatch: func};
