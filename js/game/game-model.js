import {initialState} from './quest';
import {LEVELS_COUNT} from '../settings';
import {createTimer} from '../timer';
export default class GameModel {

  // constructor({data, playerName}) {
  // this._playerName = playerName;
  // this._data = data;
  // }
  //
  // get player() {
  //   return this._playerName;
  // }
  //
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

  nextQuestion() {
    this.resetTime();
    createTimer(this._state.time);
  }

  addAnswerType(answer) {
    this._state = Object.assign({}, this._state, {
      answers: [...this._state.answers, answer],
      time: 30 - this._state.time
    });
  }

  isDead() {
    return this._state.lives <= 0;
  }


  tick() {
    const result = createTimer(this._state.time);

    this._state = Object.assign({}, this._state, {
      time: result.time
    });

    return result;
  }

  resetTime() {
    this._state = Object.assign({}, this._state, {
      time: 30
    });
  }
}
