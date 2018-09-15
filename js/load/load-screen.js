
import LoadView from './load-view';

export default class LoadScreen {
  constructor(text) {
    this._view = new LoadView(text);
  }

  get element() {
    return this._view.element;
  }
}
