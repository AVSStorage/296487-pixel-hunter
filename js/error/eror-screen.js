import ErrorView from './error-view';

export default class ErrorScreen {
  constructor(error) {
    this._view = new ErrorView(error);
  }

  get element() {
    return this._view.element;
  }
}
