const LEVELS_COUNT = 9;
const BONUS_POINTS = 50;
const ANSWER_POINTS = 100;
const REQUIRED_ANSWERS_COUNT = 2;
import HeaderView from './header/header-view';
import WelcomeView from './welcome/welcome-view';
import {changeScreen} from './util';
const renderHeader = (game) => {
  const header = new HeaderView(game);
  header.onExitGame = () => {
    changeScreen(new WelcomeView().element);

  };
  return header;
};

export {LEVELS_COUNT, BONUS_POINTS, ANSWER_POINTS, REQUIRED_ANSWERS_COUNT, renderHeader};
