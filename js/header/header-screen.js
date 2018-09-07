import HeaderView from './header-view';
import Application from '../main';

export default class HeaderScreen {
  constructor(data) {
    this._data = data;
    this._view = new HeaderView(data);
    this._view.goPreviousScreen = this.goPreviousScreen.bind(this);
  }

  get element() {
    return this._view.element;
  }

  get view() {
    return this._view;
  }

  goPreviousScreen() {
    Application.start();

  }
}
