/**
 * Created by Ruslan on 19-Apr-16.
 */
'use strict';

let Component = require('./component');
let EmojiPanel = require('./emojiPanel');
let emojify = require('./emojify');

class MessageForm extends Component{
  constructor(options) {
    super(options);
    
    this._input = this._el.querySelector('[data-selector="message-input"]');
    this._emojiButton = this._el.querySelector('[data-selector="emoji-button"]');
    
    this._emojiPanel = new EmojiPanel({
      element: this._el.querySelector('[data-component="emoji-panel"]')
    });

    this._el.addEventListener('submit', this._onMessageSend.bind(this));
    this._emojiButton.addEventListener('click', this._onEmojiButtonClick.bind(this));

    this._emojiPanel.on('emojiSelected', this._onEmojiSelected.bind(this));
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
  
  _onEmojiButtonClick(event){
    var coords = this._emojiButton.getBoundingClientRect();
    this._emojiPanel.putPanelNearButton(coords.left, coords.top);

    if(this._emojiPanel.hidden) {
      this._emojiPanel.show();
    } else {
      this._emojiPanel.hide();
    }
    

  }

  _onEmojiSelected(event) {
    var emoji = event.detail;
    this._input.value += emoji;

    emojify.run(this._input);
  }
  //hey
}

module.exports = MessageForm;