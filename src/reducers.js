/* @flow */

import {Map, List, fromJS} from 'immutable';
import type {Action} from './typedef';
import reduce from 'lodash/reduce';
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

const emptyMap = new Map(),
  emptyList = new List();

/* eslint-disable require-jsdoc */
/* eslint-disable complexity */

export default function reducer(state: Map = emptyMap, action: Action): Map {
  switch (action.type) {
    case BATCH:
      return reduce(action.payload, reducer, state);
    case ADD_ERROR:
      return state.updateIn(['errors'], emptyList, list => list.push(action.payload));
    case CLEAR_ERRORS:
      return state.set('errors', emptyList);
    case ACTIVE_TAB:
      return state.set('active_tab', action.payload);
    case ACTIVE_SETTINGS_PANEL:
      return state.set('active_settings_panel', action.payload);
    case IMAGE_WIDTH:
      return state.set('image_width', action.payload);
    case IMAGE_HEIGHT:
      return state.set('image_height', action.payload);
    case NICKNAME:
      return state.set('nickname', action.payload);
    case CAROUSEL_SLIDE:
      return state.withMutations(map => {
        map.set('carousel_index', action.index).set('carousel_direction', action.direction);
      });
    case ADD_MESSAGE:
      return state.updateIn(['messages'], emptyList, list => list.push(fromJS(action.payload)));
    case UNREAD_MESSAGES:
      return state.set('unread_messages', action.payload);
    default:
      return state;
  }
}
