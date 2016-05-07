/**
 * Created by Ruslan on 20-Apr-16.
 */
'use strict';

let Component = require('./component');

class LoginForm extends Component {
  constructor(options) {
    super(options);
    
    this._password = this._el.querySelector('[data-selector="password"]');
    this._name = this._el.querySelector('[data-selector="name"]');

    this._el.addEventListener('submit', this._onSubmit.bind(this));
    
    this._tryToGetUser();
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
    }

    if (xhr.status === 403) {
      this._showError('Wrong password');
    }
  }

  _showError(errorMessage) {
    var errorElement = this._el.querySelector('[data-selector="error-message"]');
    var formGroupElement = this._el.querySelector('[data-selector="form-group-password"]');

    formGroupElement.classList.add('has-error');
    errorElement.innerHTML = errorMessage;
  }

  _tryToGetUser(){
    let xhr = new XMLHttpRequest();

    xhr.open("GET", '/user', true);

    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return;

      if (xhr.status === 200) {
        this._trigger('login', JSON.parse(xhr.responseText));
      }
    };

    xhr.send();
  }
}

module.exports = LoginForm;