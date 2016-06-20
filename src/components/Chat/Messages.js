/* @flow */

import React, {Component, PropTypes, addons} from 'react/lib/ReactWithAddons';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Media from 'react-bootstrap/lib/Media';
import {List, Map} from 'immutable';

/* eslint-disable require-jsdoc */
/* eslint-disable lodash/prefer-lodash-method */

const {instanceOf, string} = PropTypes;

export default class Messages extends Component {

  static propTypes: Object;

  props: Object;

  setElement: (element: HTMLDivElement) => void;

  element: HTMLDivElement;

  static renderMessage(message: Map, i: number, nickname: string): any {
    const user = message.get('user'),
      isCurrentUser = nickname === user;

    return (
      <Media key={i}>
        {isCurrentUser ? null : <Media.Left><Glyphicon glyph="chevron-left" /></Media.Left>}
        <Media.Body>
          {isCurrentUser ? null : <Media.Heading>{user}</Media.Heading>}
          <div className={`pull-${isCurrentUser ? 'right' : 'left'}`}>{message.get('message')}</div>
        </Media.Body>
        {isCurrentUser ? <Media.Right><Glyphicon glyph="chevron-right" /></Media.Right> : null}
      </Media>
    );
  }

  constructor(props: Object) {
    super(props);
    this.setElement = this.setElement.bind(this);
  }

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return addons.shallowCompare(this, props, state);
  }

  setElement(element: HTMLDivElement) {
    this.element = element;
  }

  scrollToBottom() {
    this.element.scrollTop = this.element.scrollHeight;
  }

  renderMessages(): ?Array<any> {
    const {messages, nickname} = this.props;

    if (!messages) {
      return null;
    }

    return messages.map((message, i) => Messages.renderMessage(message, i, nickname));
  }

  render(): any {
    return <div ref={this.setElement} className="chat-messages">{this.renderMessages()}</div>;
  }

}

Messages.propTypes = {messages: instanceOf(List), nickname: string};
