import {LEVELS_COUNT, initialState, Time} from '../settings';
import {createTimer} from '../timer';
export default class GameModel {
  constructor({questData, playerName}) {
    this._playerName = playerName;
    this._data = questData;
  }

  get player() {
    return this._playerName;
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

  nextQuestion() {
    this.resetTime();
    createTimer(this._state.time);
  }

  isLastQuestion() {
    return this._state.level === LEVELS_COUNT;
  }

  addAnswerType(answer) {
    this._state = Object.assign({}, this._state, {
      answers: [...this._state.answers, {'answerType': answer, 'time': Time.START - this._state.time}],
    });
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
      time: Time.START
    });
  }

  isDead() {
    return this._state.lives <= 0;
  }

}
