import RulesView from './rules-view';
import HeaderScreen from '../header/header-screen';
import Application from '../Application';

export default class RulesScreen {
  constructor() {
    this._view = new RulesView();
    this._view.goNextScreen = (playerName) => {
      Application.showGame(playerName);
    };
  }

  get element() {
    const element = this._view.element;
    element.insertBefore(new HeaderScreen().element, element.firstChild);
    return element;
  }
}
