/**
 * Created by Ruslan on 19-Apr-16.
 */
'use strict';

let Component = require('./component');
let messageTemplateFunction = require('../templates/message.hbs');

class MessageHistory extends Component {
  constructor(options) {
    super(options);
  }

  addMessage(message) {
    this._el.insertAdjacentHTML('beforeEnd', messageTemplateFunction({
      username: message.username,
      text: message.text,
      date: new Date().toLocaleTimeString()
    }));
  }
}

module.exports = MessageHistory;