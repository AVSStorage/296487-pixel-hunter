import HeaderView from './header-view';
import Application from '../main';
import ConfirmScreen from '../confirm/confirm-screen';

export default class HeaderScreen {
  constructor(data, stopTimer) {
    this._data = data;
    this._view = new HeaderView(data);
    this._view.goPreviousScreen = this.goPreviousScreen.bind(this);
    this._stopTimer = stopTimer;
  }

  get element() {
    return this._view.element;
  }

  get view() {
    return this._view;
  }

  goPreviousScreen() {
    if (!this._data) {
      Application.renderWelcomeScreen();
    }

    const confirm = new ConfirmScreen();
    confirm.isOk = () => {
      Application.start();
      if (this._data) {
        this._stopTimer();
      }
    };

  }
}
