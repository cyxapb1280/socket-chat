/**
 * Created by Ruslan on 19-Apr-16.
 */
'use strict';

let Component = require('./component');
let MessageForm = require('./messageForm');
let MessageHistory = require('./messageHistory');
let LoginForm = require('./loginForm');

class Chat extends Component{
  constructor(options){
    super(options);
    this._socket = null;
    this._username = null;
    
    this._messageForm = new MessageForm({
      element: this._el.querySelector('[data-component="message-form"]')
    });
    
    this._messageHistory = new MessageHistory({
      element: this._el.querySelector('[data-component="message-history"]')
    });
    
    this._loginForm = new LoginForm({
      element: this._el.querySelector('[data-component="login-form"]')
    });

    this._messageForm.on('messageReady', this._onInputFieldMessageReady.bind(this));

    this._loginForm.on('login', this._onLoginFormLogin.bind(this));
  }

  _onInputFieldMessageReady(event){
    let message = {
      text: event.detail,
      username: this._username
    };

    this._socket.emit('message', message);
    this._messageHistory.addMessage(message);
  }

  _onSocketBroadcast(message) {
    this._messageHistory.addMessage(message);
  }

  _onLoginFormLogin(event) {
    this._socket = io();
    this._username = event.detail.username;

    this._loginForm.hide();
    this._socket.on('broadcast', this._onSocketBroadcast.bind(this));
  }
}

module.exports = Chat;