export default class UserInfo {
  constructor({profileNameSelector, profileAboutSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
    return {name: this._profileName.textContent, about: this._profileAbout.textContent}
  }

  setUserInfo(userInfo) {
    this._profileName.textContent = userInfo.name;
    this._profileAbout.textContent = userInfo.about;
  }
}
