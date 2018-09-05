import AbstractView from '../abstract-view';
import HeaderView from '../header/header-view';
import WelcomeView from '../welcome/welcome-view';
import renderStats from '../stats/stats-render';

import {changeScreen} from '../util';
import {BONUS_POINTS} from '../settings.js';

const renderFailedTemplate = (answersType) =>
  `<section class="result">
  <h2 class="result__title">FAIL</h2>
  <table class="result__table">
    <tr>
      <td class="result__number">2.</td>
      <td>
        <ul class="stats">
            ${renderStats(answersType)}
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table></section>`;

const renderSuccessGameTemplate = (statsValues, answersType) =>
  `<section class="result">
  <h2 class="result__title">Победа!</h2>
  <table class="result__table">
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
        <ul class="stats">
          ${renderStats(answersType)}
        </ul>
      </td>
      <td class="result__points">× 100</td>
      <td class="result__total">${statsValues.correctPoints}</td>
    </tr>
      ${statsValues.fastBonus !== 0 ? `<tr>
      <td></td> <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${statsValues.fastBonus}<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${statsValues.fastBonus * BONUS_POINTS}</td>
      </tr>` : ``}
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${statsValues.livesBonus} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${statsValues.livesBonus * BONUS_POINTS}</td>
      </tr>
      ${statsValues.slowBonus !== 0 ? `  <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${statsValues.slowBonus}<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${-(statsValues.slowBonus * BONUS_POINTS)}</td>
        </tr>` : ``}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${statsValues.totalPoints}</td>
      </tr>
    </table>
  </section>`;

export default class StatsView extends AbstractView {
  constructor(stats, answerType) {
    super();
    this._stats = stats;
    this._answerType = answerType;
  }

  get template() {
    return `
        ${this._stats.correctPoints === 0 ? renderFailedTemplate(this._answerType) : renderSuccessGameTemplate(this._stats, this._answerType)}
      `;
  }

  bind() {
    const header = new HeaderView();
    header.onExitGame = () => {
      const welcomeScreen = new WelcomeView();
      changeScreen(welcomeScreen.element);
    };
    this.element.insertBefore(header.element, this.element.firstChild);
  }

}
