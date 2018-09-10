import AbstractView from '../abstract-view';

const renderContentWithData = ({time, lives}) => {
  return `<h1 class='game__timer'>${time}</h1>
          <div class='game__lives'>
          ${new Array(3 - lives)
          .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
          .join(``)}
          ${new Array(lives)
            .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
            .join(``)}
          </div>`;
};

const renderGameLives = (lives) => {
  return `${new Array(3 - lives)
  .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
  .join(``)}
  ${new Array(lives)
    .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
    .join(``)}`;
};
export default class HeaderView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return `<header class='header'>
              <div class='header__back'>
                <button class='back'>
                <span class="visually-hidden">Вернуться к началу</span>
                <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
                  <use xlink:href="img/sprite.svg#arrow-left"></use>
                </svg>
                <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
                  <use xlink:href="img/sprite.svg#logo-small"></use>
                </svg>
                </button>
              </div>
              ${this._data ? renderContentWithData(this._data) : ``}
            </header>`;
  }


  changeLives(state) {
    this._lives.innerHTML = renderGameLives(state.lives);
  }

  changeTime({time}) {
    if (time <= 3000) {
      this._timer.classList.add(`game__timer--critical`);
    } else {
      this._timer.classList.remove(`game__timer--critical`);
    }

    this._timer.textContent = time;
  }

  bind() {
    const element = this.element;

    this._timer = element.querySelector(`.game__timer`);
    this._lives = element.querySelector(`.game__lives`);
    const backButton = element.querySelector(`.back`);

    backButton.addEventListener(`click`, () => {
      this.goPreviousScreen();
    });
  }
}
