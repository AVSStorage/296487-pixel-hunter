import AbstractView from '../abstract-view';
import HeaderScreen from '../header/header-screen';
import WelcomeView from '../welcome/welcome-view';
import {checkAnswers} from './stats-answers';

import {changeScreen} from '../util';


export default class StatsView extends AbstractView {
  constructor(stats) {
    super();
    this._stats = stats.state;
    this._answerType = stats.state.answers;
  }

  get template() {
    return `
        ${checkAnswers(this._answerType, this._stats.lives)}
      `;
  }

  bind() {
    const header = new HeaderScreen();
    header.onExitGame = () => {
      const welcomeScreen = new WelcomeView();
      changeScreen(welcomeScreen.element);
    };
    this.element.insertBefore(header.element, this.element.firstChild);
  }

}
