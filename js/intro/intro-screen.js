import IntroView from './intro-view';
import Application from '../Application';
export default class IntroScreen {
  constructor() {
    this._view = new IntroView();
    this._view.goNextScreen = () => {
      Application.showResultPreloader();
    };
  }

  get element() {
    return this._view.element;
  }
}
