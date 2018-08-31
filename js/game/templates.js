const BONUS_POINTS = 50;
const LEVELS_COUNT = 10;

const headerTemplate = (state) => `
<header class="header">
<button class="back">
  <span class="visually-hidden">Вернуться к началу</span>
  <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
    <use xlink:href="img/sprite.svg#arrow-left"></use>
  </svg>
  <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
    <use xlink:href="img/sprite.svg#logo-small"></use>
  </svg>
</button>
<div class="game__timer">${state.time}</div>
<div class="game__lives">
  ${new Array(3 - state.lives)
  .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
  .join(``)}
  ${new Array(state.lives)
    .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
    .join(``)}
</div>
</header>`;

const welcomeTemplate = (template) =>
  `<section class="greeting central--blur">
  <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
  <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
  <div class="greeting__challenge">
    <h3 class="greeting__challenge-title">${template.title}</h3>
    <p class="greeting__challenge-text">Правила игры просты:</p>
    <ul class="greeting__challenge-list">
    ${template.description.map((it) => `<li>${it}</li>`).join(``)}
    </ul>
  </div>
  <button class="greeting__continue" type="button">
    <span class="visually-hidden">Продолжить</span>
    <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-right"></use>
    </svg>
  </button>
  </section>`;

const rulesTemplate = (template) =>
  `<header class="header">
  <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>
  </button>
  </header>
  <section class="rules">
  <h2 class="rules__title">${template.title}</h2>
  <ul class="rules__description">
    ${template.setDescription().split(`</li>`).map((it) => `${it}</li>`).join(``)}
  </ul>
  <p class="rules__ready">Готовы?</p>
  <form class="rules__form">
    <input class="rules__input" type="text" placeholder="Ваше Имя">
    <button class="rules__button  continue" type="submit" disabled>Go!</button>
  </form>
</section>`;

const defineLevel = (level, it) => {
  if (level.question.length < 3) {
    return `  <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="${it.name}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="${it.name}" type="radio" value="paint">
          <span>Рисунок</span>  </label>`;
  }
  return ``;
};
const levelTemplate = (level) =>
  `<section class="game">
  <p class="game__task">${level.title}</p>
  <form class="game__content game__content--${level.className}">
  ${level.question.map((it) => `<div class="game__option">
      <img src="${it.image}" alt="${it.imageAlt}" width="${level.imageWidth}" height="${level.imageHeight}">
      ${defineLevel(level, it)}
    </div>`).join(``)}
    </form>
   <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
   </ul>
  </section>`;


const renderUnknownAnswers = (answersType) => {
  if (answersType.length < LEVELS_COUNT) {
    const answers2 = [];
    for (let i = 0; i < (LEVELS_COUNT - answersType.length); i++) {
      answers2[i] = `<li class="stats__result stats__result--unknown"></li>`;
    }
    return answers2.map((it) => it).join(``);
  } else {
    return ``;
  }
};

const renderFailedTemplate = (answersType) =>
  `<section class="result">
  <h2 class="result__title">FAIL</h2>
  <table class="result__table">
    <tr>
      <td class="result__number">2.</td>
      <td>
        <ul class="stats">
        ${answersType.map((it) => `<li class="stats__result stats__result--${it}"></li>`).join(``)}
          ${renderUnknownAnswers(answersType) }
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
          ${answersType.map((it) => `<li class="stats__result stats__result--${it}"></li>`).join(``)}
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

const statsTemplate = (statsValues, answersType) =>
  `<header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
    </header>
    ${statsValues.correctPoints === 0 ? renderFailedTemplate(answersType) : renderSuccessGameTemplate(statsValues, answersType)}
  `;


export {headerTemplate, welcomeTemplate, rulesTemplate, levelTemplate, statsTemplate};
