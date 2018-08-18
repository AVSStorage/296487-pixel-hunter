import {changeScreen, getElementFromTemplate} from './util';
import welcomeScreen from './welcome-screen';
const newElement = getElementFromTemplate(`
 <section class="intro">
<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
<p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>`);

const switchButton = newElement.querySelector(`.intro__asterisk`);
switchButton.addEventListener(`click`, () => {
  changeScreen(welcomeScreen);
});


export default newElement;

