export default class UserInfo {
  constructor({profileNameSelector, profileAboutSelector, avatarSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {name: this._profileName.textContent, about: this._profileAbout.textContent}
  }

  setUserInfo(userInfo) {
    this._profileName.textContent = userInfo.name;
    this._profileAbout.textContent = userInfo.about;
    this.id = userInfo._id;
    this._avatar.src = userInfo.avatar;
  }
}
