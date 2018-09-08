import IntroView from './intro-view';
import Application from '../main';
export default class IntroScreen {
  constructor() {
    this._view = new IntroView();
    this._view.goNextScreen = () => {
      Application.renderWelcomeScreen();
    };
  }

  get element() {
    return this._view.element;
  }
}
