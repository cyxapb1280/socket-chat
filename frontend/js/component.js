/**
 * Created by Ruslan on 29-Mar-16.
 */

'use strict';

class Component {
  constructor(options) {
    this._el = options.element;
  }

  hide() {
    this._el.classList.add('js-hidden');
  }

  show() {
    this._el.classList.remove('js-hidden');
  }

  get element() {
    return this._el;
  }

  on(eventName, handler) {
    this._el.addEventListener(eventName, handler);
  }

  _trigger(eventName, data, options) {
    options = options || {};

    if (data !== undefined && data !== null) {
      options.detail = data;
    }

    let event = new CustomEvent(eventName, options);

    this._el.dispatchEvent(event);
  }
}

module.exports = Component;