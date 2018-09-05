import AbstractView from '../abstract-view';
import renderStats from '../stats/stats-render';
import StatsView from '../stats/stats-view';
import {changeScreen} from '../util';
import {levels, gameStats, initialState} from './quest';

import {LEVELS_COUNT, BONUS_POINTS, ANSWER_POINTS, REQUIRED_ANSWERS_COUNT, renderHeader} from '../settings.js';
const nextScreen = (game) => {
  if (game.lives >= 0 && !(game.level === LEVELS_COUNT)) {
    game.level += 1;
    const gameLevel = new LevelView(levels[game.level]);
    const gameScreen = document.createElement(`div`);
    gameScreen.appendChild(renderHeader(game).element);
    gameScreen.appendChild(gameLevel.element);
    changeScreen(gameScreen);
    return gameLevel;
  } else {
    const states = countStatsValues(game.answers);
    changeScreen(new StatsView(...states).element);
    return ``;
  }

};

const countStatsValues = (answers) => {
  let stats = Object.assign({}, gameStats);
  const points = answers.filter((answer) => answer === `correct`).length;
  stats.correctPoints = points * ANSWER_POINTS;

  if (game.lives >= 0) {
    stats.livesBonus = game.lives;
    stats.totalPoints = stats.correctPoints + stats.livesBonus * BONUS_POINTS + stats.fastBonus * BONUS_POINTS - stats.slowBonus * 50;
  } else {
    stats = Object.assign({}, gameStats);
  }

  return [stats, answers];

};
let game = Object.assign({}, initialState);


export default class LevelView extends AbstractView {
  constructor(level) {
    super();
    this._level = level;
    this._game = game;

  }

  get template() {
    return `<section class="game">
      <p class="game__task">${this._level.title}</p>
      <form class="game__content game__content--${this._level.className}">
      ${this._level.question.map((it) => `<div class="game__option">
          <img src="${it.image}" alt="${it.imageAlt}" width="${this._level.imageWidth}" height="${this._level.imageHeight}">
          ${this._level.question.length < 3 ? `  <label class="game__answer game__answer--photo">
                  <input class="visually-hidden" name="${it.name}" type="radio" value="photo">
                  <span>Фото</span>
                </label>
                <label class="game__answer game__answer--paint">
                  <input class="visually-hidden" name="${it.name}" type="radio" value="paint">
                  <span>Рисунок</span>  </label>` : ``}
        </div>`).join(``)}
        </form>
       <ul class="stats">
          ${renderStats(this._game.answers)}
       </ul>
    </section>`;
  }

  onAnswer() { }
  onClick() {
    const newLevelScreen = nextScreen(this._game);
    newLevelScreen.onAnswer = this.onAnswer;
  }
  bind() {
    const gameForm = this.element.querySelector(`.game__content`);
    const radioButtons = Array.from(gameForm.querySelectorAll(`input`));
    let correctAnswer;
    gameForm.addEventListener(`click`, (evt) => {

      const option = evt.target.closest(`.game__option`);

      if (option.querySelector(`.game__answer`)) {
        return false;
      }

      let answers = this._level.question.find((it) =>
        (option.querySelector(`img`).alt === it.imageAlt) && it.answer
      );

      if (answers) {
        correctAnswer = true;
      } else {
        correctAnswer = false;
      }

      this.onAnswer(correctAnswer, this._game);
      this.onClick();

      return correctAnswer;
    });

    gameForm.addEventListener(`change`, () => {
      const checkedAnswerControls = radioButtons.filter((radio) => {
        return radio.checked;
      });

      if (!checkedAnswerControls.length || ((this._level.question.length === REQUIRED_ANSWERS_COUNT)
          && checkedAnswerControls.length !== REQUIRED_ANSWERS_COUNT)) {
        return;
      }

      correctAnswer = this._level.question.every((answer, i) => {
        return answer.answer === checkedAnswerControls[i].value;
      });


      this.onAnswer(correctAnswer, this._game);
      this.onClick();

    });

  }
}
