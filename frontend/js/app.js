/**
 * Created by Ruslan on 19-Apr-16.
 */
'use strict';
let Chat = require('./chat');

new Chat({
  element: document.querySelector('[data-component="chat"]')
});