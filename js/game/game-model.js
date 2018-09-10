import {initialState} from './quest';
import {LEVELS_COUNT} from '../settings';
export default class GameModel {
  constructor(data) {
    this._data = data;
  }

  get state() {
    return this._state;
  }

  init() {
    this._state = Object.assign({}, initialState);
  }

  die() {
    const lives = this._state.lives - 1;

    this._state = Object.assign({}, this._state, {
      lives
    });
  }

  isLastQuestion() {
    return this._state.level === LEVELS_COUNT;
  }
  addAnswerType(answer) {
    this._state = Object.assign({}, this._state, {
      answers: [...this._state.answers, answer]
    });
  }

  isDead() {
    return this._state.lives <= 0;
  }
}
