import GameModel from './game-model';
import GameView from './game-view';
import HeaderScreen from '../header/header-screen';
import {levels} from './quest';
import Application from '../main';

export default class GameScreen {
  constructor() {
    this._model = new GameModel();
  }

  get element() {
    return this._root;
  }

  startGame() {

    this._model.init();

    this._root = document.createElement(`div`);
    this._header = new HeaderScreen(this._model.state, this.stopTimer.bind(this));
    this._root.appendChild(this._header.element);

    this.updateGameData();
  }

  updateTime() {
    this._header.view.changeTime(this._model.state);
  }

  updateLives() {
    this._header.view.changeLives(this._model.state);
  }

  updateGameData() {
    this._model.nextQuestion();

    this.runTimer();
    this.updateTime();
    this.updateLives();

    const game = new GameView(levels[this._model.state.level], this._model.state);
    const gameElement = game.element;

    if (this._game) {
      this._root.replaceChild(gameElement, this._game);
    } else {
      this._root.appendChild(gameElement);
    }

    this._game = gameElement;
    game.onAnswer = this.onAnswer.bind(this);
  }

  finishGame() {
    Application.finish(this._model);
  }

  runTimer() {
    this._interval = setInterval(() => {
      if (this._model.tick().done) {
        this.onAnswer(false);
      }

      this.updateTime();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this._interval);
  }


  onAnswer(answer) {
    this.stopTimer();
    this._model.addAnswerType(answer);
    this._model.state.level += 1;

    if ((!this._model.isDead() && !answer) && this._model.isLastQuestion()) {
      this._model.die();
    }

    if ((this._model.isDead() && !answer) || this._model.isLastQuestion()) {
      this.finishGame();
      return;
    }

    if (!answer) {
      this._model.die();
    }

    this.updateGameData();
  }
}
