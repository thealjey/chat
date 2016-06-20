/* @flow */

import type {Action} from './typedef';
import trim from 'lodash/trim';
import {
  BATCH,
  ADD_ERROR,
  CLEAR_ERRORS,
  ACTIVE_TAB,
  ACTIVE_SETTINGS_PANEL,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
  NICKNAME,
  CAROUSEL_SLIDE,
  ADD_MESSAGE,
  UNREAD_MESSAGES
} from './constants';

/* eslint-disable require-jsdoc */

export function batch(payload: Array<Action>): Action {
  return {type: BATCH, payload};
}

export function addError(error: any): Action {
  return {type: ADD_ERROR, payload: String(error)};
}

export function clearErrors(): Action {
  return {type: CLEAR_ERRORS};
}

export function setActiveTab(payload: string): Action {
  return {type: ACTIVE_TAB, payload};
}

export function setActiveSettingsPanel(payload: string): Action {
  return {type: ACTIVE_SETTINGS_PANEL, payload};
}

export function setImageWidth(width: string): Action {
  return {type: IMAGE_WIDTH, payload: parseInt(width, 10)};
}

export function setImageHeight(height: string): Action {
  return {type: IMAGE_HEIGHT, payload: parseInt(height, 10)};
}

export function setNickname(nickname: string): Action {
  return {type: NICKNAME, payload: trim(nickname)};
}

export function setCarouselSlide(index: number, direction: ?string): Action {
  return {type: CAROUSEL_SLIDE, index, direction};
}

export function addMessage(payload: {message: string, user: string}): Action {
  return {type: ADD_MESSAGE, payload};
}

export function setUnreadMessages(payload: boolean): Action {
  return {type: UNREAD_MESSAGES, payload};
}
