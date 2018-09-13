import StatsView from './stats-view';
import HeaderScreen from '../header/header-screen';

export default class StatsScreen {
  constructor(data) {
    this._view = new StatsView(data);
  }

  get element() {
    const element = this._view.element;
    element.insertBefore(new HeaderScreen().element, element.firstChild);
    return element;
  }
}
