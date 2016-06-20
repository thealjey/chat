/* @flow */

declare module 'socket.io-client' {
  declare function connect(url: string, opts: ?Object): EventEmitter;
}
