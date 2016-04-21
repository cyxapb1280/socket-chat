/**
 * Created by Ruslan on 20-Apr-16.
 */
'use strict';

let Component = require('./component');

class LoginForm extends Component {
  constructor(options) {
    super(options);

    this._error = this._el.querySelector('[data-selector="error"]');
    this._password = this._el.querySelector('[data-selector="password"]');
    this._name = this._el.querySelector('[data-selector="name"]');

    this._el.addEventListener('submit', this._onSubmit.bind(this));
  }

  hide() {
    this._el.classList.add('js-hidden');
  }

  _onSubmit(event) {
    event.preventDefault();

    let formData = JSON.stringify({
      name: this._name.value,
      password: this._password.value
    });

    let xhr = new XMLHttpRequest();

    xhr.open("POST", '/login', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = this._onResponse.bind(this);
    
    
    xhr.send(formData);
  }

  _onResponse(event) {
    let xhr = event.target;
    if (xhr.readyState != 4) return;

    if (xhr.status === 200) {
      this._trigger('login', JSON.parse(xhr.responseText));
    } else {
      this._error.innerHtml = 'Error: ' + xhr.statusText;
    }
  }
}

module.exports = LoginForm;