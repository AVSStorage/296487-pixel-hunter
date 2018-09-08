import {changeScreen} from './util';
import WelcomeScreen from './welcome/welcome-screen';
import RulesScreen from './rules/rules-screen';
import GameScreen from './game/game-screen';
import StatsView from './stats/stats-view';
import IntroScreen from './intro/intro-screen';


export default class Application {

  static start() {
    const introScreen = new IntroScreen();
    changeScreen(introScreen.element);
  }

  static renderWelcomeScreen() {
    const greetingScreen = new WelcomeScreen();
    changeScreen(greetingScreen.element);
  }

  static showRules() {
    const rulesScreen = new RulesScreen();
    changeScreen(rulesScreen.element);
  }

  static showGame() {

    const gameScreen = new GameScreen();
    gameScreen.startGame();
    changeScreen(gameScreen.element);
  }

  static finish(state) {
    Application.showResult(state);
  }

  static showResult(results) {
    const resultScreen = new StatsView(results);
    changeScreen(resultScreen.element);
  }
}

Application.start();
