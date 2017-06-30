/**
 * Created by Ruslan on 19-Apr-16.
 */
'use strict';

let Component = require('./component');
let messageTemplateFunction = require('../templates/message.hbs');
let emojify = require('./emojify');

class MessageHistory extends Component {
  constructor(options) {
    super(options);
  }

  addMessage(message) {
    this._el.insertAdjacentHTML('beforeEnd', messageTemplateFunction({
      username: message.username,
      text: message.text,
      date: (message.posted ? new Date(message.posted).toLocaleTimeString() : new Date().toLocaleTimeString())
    }));

    emojify.run(this._el.lastElementChild);
    this._el.scrollTop = this._el.scrollHeight;
  }

  addMessages(messages) {
    messages.forEach((message) => {
      this.addMessage(message);
    });
  }
}

module.exports = MessageHistory;