import GameModel from './game-model';
import GameView from './game-view';
import HeaderScreen from '../header/header-screen';
import Application from '../Application';

export default class GameScreen {
  constructor(data) {
    this._data = data;
    this._model = new GameModel(data);
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


  updateGameData() {
    this._model.nextQuestion();
    this.updateLives();
    this.runTimer();
    this.updateTime();

    const game = new GameView(this._data.questData[this._model.state.level], this._model.state);
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
    Application.finish(this._model._state, this._model._playerName);
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
