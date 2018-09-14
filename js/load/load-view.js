
import AbstractView from '../abstract-view';

export default class LoadView extends AbstractView {
  constructor(text = `Данные загружаются...`) {
    super();
    this._text = text;
  }

  get template() {
    return `<div class='load'>
      <p class='load__text'>${this._text}</p>
    </div>`;
  }
}
