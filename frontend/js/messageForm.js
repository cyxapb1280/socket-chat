/**
 * Created by Ruslan on 19-Apr-16.
 */
'use strict';

let Component = require('./component');

class MessageForm extends Component{
  constructor(options) {
    super(options);
    
    this._input = this._el.querySelector('[data-selector="message-input"]');

    this._el.addEventListener('submit', this._onMessageSend.bind(this))
  }
  
  _onMessageSend(event){
    event.preventDefault();

    let message = this._input.value;
    
    if(!message){
      return;
    }
    
    this._trigger('messageReady', message);

    this._input.value = '';
  }
}

module.exports = MessageForm;