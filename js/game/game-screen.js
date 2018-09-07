import GameModel from './game-model';
import GameView from './game-view';
import HeaderScreen from '../header/header-screen';
import {levels} from './quest';
import Application from '../main';

export default class GameScreen {
  constructor(data) {
    this._model = new GameModel(data);
  }

  get element() {
    return this._root;
  }

  startGame() {

    this._model.init();

    this._root = document.createElement(`div`);
    this._header = new HeaderScreen(this._model.state);
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

  onAnswer(answer) {
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
