import AbstractView from '../abstract-view';
import renderStats from '../stats/stats-render';
import renderAnswers from './answers/answers';
import {REQUIRED_ANSWERS_COUNT, QuestionType} from '../settings.js';
const ContentType = {
  [QuestionType.GUESS_ONE]: `game__content--wide`,
  [QuestionType.FIND]: `game__content--triple`
};

export default class GameView extends AbstractView {
  constructor(level, game) {
    super();
    this._level = level;
    this._game = game;

  }

  get template() {
    return `<section class="game" >
      <p class="game__task">${this._level.title}</p>
      <form class="game__content ${ContentType[this._level.type] || ``}">
     ${renderAnswers(this._level)}
        </form>
       <ul class="stats">
          ${renderStats(this._game.answers)}
       </ul>
    </section>`;
  }

  onAnswer() { }

  bind() {
    const gameForm = this.element.querySelector(`.game__content`);
    const radioButtons = Array.from(gameForm.querySelectorAll(`input`));
    let correctAnswer;
    gameForm.addEventListener(`click`, (evt) => {

      const option = evt.target.closest(`.game__option`);

      if (option.querySelector(`.game__answer`)) {
        return false;
      }
      
      if (option.classList.contains(`game__option--selected`)) {
        correctAnswer = true;
      } else {
        correctAnswer = false;
      }

      this.onAnswer(correctAnswer);
      return correctAnswer;
    });

    gameForm.addEventListener(`change`, () => {
      const checkedAnswerControls = radioButtons.filter((radio) => {
        return radio.checked;
      });


      if (!checkedAnswerControls.length || ((this._level.answers.length === REQUIRED_ANSWERS_COUNT)
          && checkedAnswerControls.length !== REQUIRED_ANSWERS_COUNT)) {
        return;
      }

      correctAnswer = this._level.answers.every((answer, i) => {
        return answer.type === checkedAnswerControls[i].value;
      });
      
      this.onAnswer(correctAnswer);

    });

  }
}
