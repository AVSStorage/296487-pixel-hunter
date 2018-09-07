import renderStats from '../stats/stats-render';
import {BONUS_POINTS, ANSWER_POINTS, LIVES_COUNT} from '../settings';
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

const renderSuccessGameTemplate = (answers, livesBonus) =>{

  const correctPoints = answers.filter((answer) => answer === true).length * ANSWER_POINTS;
  const fastBonus = answers.filter((answer) => answer === `fast`).length;
  const slowBonus = answers.filter((answer) => answer === `slow`).length;
  const totalPoints = correctPoints + fastBonus * BONUS_POINTS - slowBonus * BONUS_POINTS + livesBonus * BONUS_POINTS;

  return `<section class="result">
  <h2 class="result__title">Победа!</h2>
  <table class="result__table">
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
        <ul class="stats">
          ${renderStats(answers)}
        </ul>
      </td>
      <td class="result__points">× 100</td>
      <td class="result__total">${correctPoints}</td>
    </tr>
      ${fastBonus !== 0 ? `<tr>
      <td></td> <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${fastBonus}<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${fastBonus}</td>
      </tr>` : ``}
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${livesBonus} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${livesBonus * BONUS_POINTS}</td>
      </tr>
      ${slowBonus !== 0 ? `  <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${slowBonus}<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${-(slowBonus)}</td>
        </tr>` : ``}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${totalPoints}</td>
      </tr>
    </table>
  </section>`;
};
const checkAnswers = (answers, lives, statNumber) => {

  if (answers.filter((answer) => answer === false).length <= LIVES_COUNT) {
    return renderSuccessGameTemplate(answers, lives, statNumber);
  } else {
    return renderFailedTemplate(answers, statNumber);
  }
};

export {checkAnswers};
