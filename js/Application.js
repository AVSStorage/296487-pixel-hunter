import {changeScreen} from './util';
import WelcomeScreen from './welcome/welcome-screen';
import RulesScreen from './rules/rules-screen';
import GameScreen from './game/game-screen';
import StatsScreen from './stats/stats-screen';
import IntroScreen from './intro/intro-screen';
import ErrorScreen from './error/eror-screen';
import Loader from './loader';
// import SplashScreen from './js/splash/splash-screen.js';

let questData;

export default class Application {

  static start() {
    //  const splash = new SplashScreen();
    // changeScreen(splash.element);
    // splash.start();
    Loader.loadData().
        then((data) => {
          questData = data;
        }).
        then(() => Application.showIntro()).
        catch(Application.showError);
    // then(() => splash.stop());
  }

  static showIntro() {
    const introScreen = new IntroScreen();
    changeScreen(introScreen.element);
  }

  static showWelcomeScreen() {
    const welcomeScreen = new WelcomeScreen();
    changeScreen(welcomeScreen.element);
  }

  static showRules() {
    const rulesScreen = new RulesScreen();
    changeScreen(rulesScreen.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen({questData, playerName});
    gameScreen.startGame();
    changeScreen(gameScreen.element);
  }

  static finish(state, playerName) {
    Application.showResult(state, playerName);
  }

  static showResult(state, playerName) {
    Loader.saveResults(state, playerName).
     then(() => Loader.loadResults(playerName)).
     then((data) => changeScreen(new StatsScreen(data, playerName).element));
  }

  static showError(error) {
    const errorView = new ErrorScreen(error);
    changeScreen(errorView.element);
  }
}
