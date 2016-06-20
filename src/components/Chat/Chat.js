/* @flow */

import React, {Component, PropTypes, addons} from 'react/lib/ReactWithAddons';
import {findDOMNode} from 'react-dom';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import {addError, addMessage, setUnreadMessages, batch} from '../../actions';
import ErrorMessages from './ErrorMessages';
import Messages from './Messages';
import {List} from 'immutable';
import trim from 'lodash/trim';
import {connect} from 'socket.io-client';

/* eslint-disable require-jsdoc */

const {string, func, instanceOf, bool} = PropTypes;

export default class Chat extends Component {

  static propTypes: Object;

  static contextTypes: Object;

  props: Object;

  context: Object;

  handleSubmit: (e: any) => void;

  setMessagesList: (messagesList: Messages) => void;

  setInput: (input: any) => void;

  messagesList: Messages;

  input: HTMLInputElement;

  socket: EventEmitter;

  constructor(props: Object) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setMessagesList = this.setMessagesList.bind(this);
    this.setInput = this.setInput.bind(this);
  }

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return addons.shallowCompare(this, props, state);
  }

  setMessagesList(messagesList: Messages) {
    this.messagesList = messagesList;
  }

  setInput(input: any) {
    this.input = findDOMNode(input);
  }

  componentDidMount() {
    this.messagesList.scrollToBottom();

    this.socket = connect('http://185.13.90.140:8081/');

    this.socket.on('message', data => {
      this.context.dispatch(batch([
        setUnreadMessages(!this.props.active),
        addMessage(data)
      ]));
    });
  }

  componentDidUpdate() {
    this.messagesList.scrollToBottom();
  }

  handleSubmit(e: any) {
    e.preventDefault();

    const message = trim(this.input.value);

    if (!message) {
      return;
    }

    const {nickname} = this.props;

    if (!nickname) {
      return this.context.dispatch(addError('Please select a nickname from the Settings tab.'));
    }

    this.input.value = '';
    this.socket.emit('message', {message, user: nickname});
  }

  render(): any {
    const {errors, messages, nickname} = this.props;

    return (
      <div className="application-tab chat-tab">
        {errors && errors.size ? <ErrorMessages messages={errors} /> : null}
        <Messages ref={this.setMessagesList} messages={messages} nickname={nickname} />
        <form onSubmit={this.handleSubmit}>
          <InputGroup>
            <FormControl ref={this.setInput} type="text" />
            <InputGroup.Button>
              <Button type="submit">Send</Button>
            </InputGroup.Button>
          </InputGroup>
        </form>
      </div>
    );
  }

}

Chat.propTypes = {errors: instanceOf(List), messages: instanceOf(List), nickname: string, active: bool};
Chat.contextTypes = {dispatch: func};
