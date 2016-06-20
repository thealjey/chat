/* @flow */

export type Action = {
  type: string;
  [key: string]: any;
};

export type Store = {
  getState(): any;
  dispatch(action: Action): void;
  subscribe(listener: Function): Function;
  replaceReducer(reducer: Function): void;
};

export type CarouselEvent = {
  direction: string;
};
