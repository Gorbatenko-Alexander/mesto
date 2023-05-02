export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._checkStatus)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkStatus)
  }

  changeUserInfo(userInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    })
      .then(this._checkStatus)
  }


  changeUserAvatar(userInfo) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userInfo.avatar
      })
    })
      .then(this._checkStatus)
  }

  addCard(placeInfo) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: placeInfo.name,
        link: placeInfo.link
      })
    })
      .then(this._checkStatus)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkStatus)
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkStatus)
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkStatus)
  }
}
