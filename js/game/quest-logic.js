import {changeScreen, getElementFromTemplate, mainElement} from '../util';
import {levels, gameStats, welcomeTemplateData, initialState, rulesTemplateData} from './quest';
import {headerTemplate, welcomeTemplate, rulesTemplate, levelTemplate, statsTemplate} from './templates';


const BONUS_POINTS = 50;
const ANSWER_POINTS = 100;
const LEVELS_COUNT = 10;

const switchToGreetingScreen = (element) => {
  const switchButton = element.querySelector(`.intro__asterisk`);
  switchButton.addEventListener(`click`, () => {
    changeScreen(getElementFromTemplate(welcomeTemplate(welcomeTemplateData)));
    switchToRulesScreen(mainElement);
  });
};

const renderGreetingScreen = (template) => {
  changeScreen(template);
  switchToGreetingScreen(mainElement);
};

const switchToFirstGameScreen = (element) => {
  const switchButton = element.querySelector(`.rules__button`);
  const input = element.querySelector(`.rules__input`);
  input.addEventListener(`input`, () => {
    const isValid = input.value !== `` ? true : false;
    if (isValid) {
      switchButton.removeAttribute(`disabled`);
    } else {
      switchButton.setAttribute(`disabled`, ``);
    }
  });

  switchButton.addEventListener(`click`, () => {
    startGame(initialState);
    input.value = ``;
    switchButton.setAttribute(`disabled`, ``);
  });
};
// Переход на игровой экран с правилами
const switchToRulesScreen = (element) => {
  const switchButton = element.querySelector(`.greeting__continue`);
  switchButton.addEventListener(`click`, () => {
    changeScreen(getElementFromTemplate(rulesTemplate(rulesTemplateData)));
    switchToFirstGameScreen(mainElement);
    exitGame(mainElement);
  });
};

// Выход из игры по кнопке
const exitGame = (element, game, changeLevel) => {
  const exitButton = element.querySelector(`.back`);
  exitButton.addEventListener(`click`, () => {
    game = Object.assign({}, initialState);
    getElementFromTemplate(headerTemplate(game)).innerHTML = headerTemplate(game);
    getElementFromTemplate(levelTemplate(levels[game.level])).innerHTML = levelTemplate(levels[game.level]);
    if (changeLevel) {
      changeLevel(levels[game.level]);
    }
    changeScreen(getElementFromTemplate(welcomeTemplate(welcomeTemplateData)));
    switchToRulesScreen(mainElement);
  });
};

// Переключение и отрисовка уровней игры

const startGame = (state) => {


// Отрисовка первого экрана игры
  const game = Object.assign({}, state);
  const headerElement = getElementFromTemplate(headerTemplate(game));
  const levelElement = getElementFromTemplate(levelTemplate(levels[game.level]));
  const gameContainer = getElementFromTemplate(``);
  gameContainer.appendChild(headerElement);
  gameContainer.appendChild(levelElement);
  changeScreen(gameContainer);

  const countStatsValues = (answers) => {
    let stats = Object.assign({}, gameStats);
    const points = answers.filter((answer) => answer === `correct`).length;
    stats.correctPoints = points * ANSWER_POINTS;
    if (game.lives > 0) {
      stats.livesBonus = game.lives;
      stats.totalPoints = stats.correctPoints + stats.livesBonus * BONUS_POINTS + stats.fastBonus * BONUS_POINTS - stats.slowBonus * 50;
      changeScreen(getElementFromTemplate(statsTemplate(stats, answersType)));
      exitGame(mainElement, game, changeLevel);
    } else {
      stats = Object.assign({}, gameStats);
      changeScreen(getElementFromTemplate(statsTemplate(stats, answersType)));
      exitGame(mainElement, game, changeLevel);
    }

  };

  const updateGame = (newState) => {
    if (newState.level !== LEVELS_COUNT && newState.lives >= 0) {
      headerElement.innerHTML = headerTemplate(newState);
      levelElement.innerHTML = levelTemplate(levels[newState.level]);
      changeLevel(levels[newState.level]);
    } else {
      countStatsValues(answersType);
    }
  };

  const updateState = () => {
    game.level += 1;
    updateGame(game);
    exitGame(headerElement, game, changeLevel);
  };

  let firstAnswer;
  let secondAnswer;
  let answersType = [];

  const defineCorrectAnswer = (firstAnswerType, secondAnswerType, correctAnswer) => {
    if (firstAnswerType === correctAnswer[0].answer && !secondAnswerType) {
      answersType.push(`correct`);
      updateState();
    } else if (firstAnswerType === correctAnswer[0].answer && secondAnswerType === correctAnswer[1].answer) {
      answersType.push(`correct`);
      updateState();
    } else {
      answersType.push(`wrong`);
      game.lives -= 1;
      updateState(game);
    }
  };
  const isValid = (input, level) => {

    if (input.checked) {
      if (input.name === `question1`) {
        firstAnswer = input.value;
      } else if (input.name === `question2`) {
        secondAnswer = input.value;
      }
      if (level.question.length !== 1) {
        if (firstAnswer && secondAnswer) {
          defineCorrectAnswer(firstAnswer, secondAnswer, level.question);
          firstAnswer = ``;
          secondAnswer = ``;
          return true;
        }
      } else {
        defineCorrectAnswer(firstAnswer, undefined, level.question);
        firstAnswer = ``;
        return true;

      }
    }
    return false;
  };

  // Логика переключения уровня

  const changeLevel = (level) => {
    const answers = level.question.length < 3 ? Array.from(levelElement.querySelectorAll(`.game__answer`)) : Array.from(levelElement.querySelectorAll(`.game__option`));
    answers.map((answer) => {
      if (level.className !== `triple`) {
        const input = answer.querySelector(`input`);
        input.addEventListener(`change`, (evt) => {
          isValid(evt.target, level);
        });
      } else {
        answer.addEventListener(`click`, (evt) => {
          const valid = level.question.find((it) =>
            (evt.target.alt === it.imageAlt) && it.answer
          );
          if (valid) {
            answersType.push(`correct`);
            updateState(game);
          } else {
            game.lives -= 1;
            updateState(game);
            answersType.push(`wrong`);
          }
        });
        exitGame(headerElement, game, changeLevel);
      }
    });
  };

  // отрисовка первого игрового экрана и осуществление выхода по нажатиюю на кнопку
  changeLevel(levels[game.level]);
  exitGame(gameContainer, game, changeLevel);

  return gameContainer;
};
export {startGame, switchToRulesScreen, renderGreetingScreen, switchToGreetingScreen};
