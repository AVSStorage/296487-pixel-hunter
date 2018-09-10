import WelcomeView from './welcome-view';
import Application from '../main';

export default class WelcomeScreen {
  constructor() {
    this._view = new WelcomeView();
    this._view.goNextScreen = () => {
      Application.showRules();
    };
  }

  get element() {
    return this._view.element;
  }
}
