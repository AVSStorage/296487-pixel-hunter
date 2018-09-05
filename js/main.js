
import {changeScreen, mainElement} from './util';
import {levels, initialState} from './game/quest';


import WelcomeView from './welcome/welcome-view';
import RulesView from './rules/rules-view';
import LevelView from './game/level-view';


import {LEVELS_COUNT, renderHeader} from './settings.js';

const welcomeScreen = new WelcomeView();
welcomeScreen.goNextScreen = () => {

  const rulesScreen = new RulesView();
  rulesScreen.goNextScreen = () => {
    startGame();

  };
  changeScreen(rulesScreen.element);

};
mainElement.appendChild(welcomeScreen.element);


const startGame = () => {
  let newGame = Object.assign({}, initialState);
  const levelView = new LevelView(levels[newGame.level]);
  const levelScreen = document.createElement(`div`);
  levelScreen.appendChild(renderHeader(newGame).element);
  levelScreen.appendChild(levelView.element);

  changeScreen(levelScreen);
  levelView.onAnswer = (answer, game) => {
    if (answer) {
      game.answers.push(`correct`);

    } else {
      game.answers.push(`wrong`);
    }
    if ((!(game.lives < 0) && !answer) && !(game.level === LEVELS_COUNT)) {
      game.lives -= 1;

    }


  };
};
