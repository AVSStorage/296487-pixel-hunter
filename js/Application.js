import {changeScreen} from './util';
import WelcomeScreen from './welcome/welcome-screen';
import RulesScreen from './rules/rules-screen';
import GameScreen from './game/game-screen';
import StatsScreen from './stats/stats-screen';
import IntroScreen from './intro/intro-screen';
import ErrorScreen from './error/eror-screen';
import Loader from './loader';
import LoadScreen from './load/load-screen';

let questData;

export default class Application {
  static async start() {
    const  welcomeScreen = new WelcomeScreen();

    if (!questData) {
      const introScreen = new IntroScreen();
      changeScreen(introScreen.element);
      try {
        questData = await Loader.loadData();
        changeScreen(welcomeScreen.element);
      } catch (e) {
        Application.showError(e);
      }
    } else {
      changeScreen(welcomeScreen.element);
    }
  }

  static showRules() {
    const rulesScreen = new RulesScreen();
    changeScreen(rulesScreen.element);
  }

  static showResultPreloader() {
    const loadScreen = new LoadScreen();
    changeScreen(loadScreen.element);
}

  static showGame(playerName) {
    const gameScreen = new GameScreen({questData, playerName});
    gameScreen.startGame();
    changeScreen(gameScreen.element);
  }

  static showWelcomeScreen(){
    const welcomeScreen = new WelcomeScreen();
    changeScreen(welcomeScreen.element)
  }

  static async finish(state, playerName) {

    Application.showResultPreloader();

    try {
      await Loader.saveResults(state, playerName);
      const results = await Loader.loadResults(playerName);
      Application.showResult(results, playerName);
    } catch (error) {
      Application.showError(error);
    }
  }

  static showResult(data, playerName) {
    changeScreen(new StatsScreen(data, playerName).element)
  }

  static showError(error) {
    const errorView = new ErrorScreen(error);
    changeScreen(errorView.element);
  }
}
