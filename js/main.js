import {getElementFromTemplate} from './util';
import {mainScreenTemplate} from './game/quest';
import {renderGreetingScreen} from './game/quest-logic';

renderGreetingScreen(getElementFromTemplate(mainScreenTemplate));
