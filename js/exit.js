import welcomeScreen from './welcome-screen';
import {changeScreen} from './util';
const exitGame = (element, clearScreenData) => {
  const exitButton = element.querySelector(`.back`);
  exitButton.addEventListener(`click`, () => {
    changeScreen(welcomeScreen);
    if (clearScreenData) {
      clearScreenData();
    }
  });

};
export {exitGame};
