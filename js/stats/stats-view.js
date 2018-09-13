import AbstractView from '../abstract-view';
import StatsTableView from './stats-table';
import {LIVES_COUNT} from '../settings';


const resultToTitle = {
  [true]: `Победа!`,
  [false]: `Поражение.`
};

export default class ResultView extends AbstractView {
  constructor(results, player) {
    super();
    this._player = player;
    this._results = results.reverse();
  }

  get template() {
    return `<div class='result'>
              <h1>${resultToTitle[this.isWin()]}</h1>
              ${this.renderResultTables()}
            </div>`;
  }

  isWin() {
    const wrongAnswers = this._results[0].answers.filter((answer) => {
      return answer.answerType === false;
    });

    return wrongAnswers.length <= LIVES_COUNT;
  }

  renderResultTables() {
    let resultTables = ``;

    this._results.forEach((result, i) => {
      resultTables += new StatsTableView(result, i + 1).template;
    });

    return resultTables;
  }
}
