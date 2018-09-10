import RulesView from './rules-view';
import HeaderScreen from '../header/header-screen';
import Application from '../main';

export default class RulesScreen {
  constructor() {
    this._view = new RulesView();
    this._view.goNextScreen = (name) => {
      Application.showGame(name);
    };
  }

  get element() {
    const element = this._view.element;
    element.insertBefore(new HeaderScreen().element, element.firstChild);
    return element;
  }
}
