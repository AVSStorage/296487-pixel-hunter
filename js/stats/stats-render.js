import {AnswerTime, LEVELS_COUNT} from '../settings';
const getStatItem = ({answerTypes, time} = {}) => {
  let status = `unknown`;

  if (answerTypes) {
    status = `correct`;
    if (time < AnswerTime.FAST) {
      status = `fast`;
    } else if (time > AnswerTime.SLOW) {
      status = `slow`;
    }

  } else if (answerTypes === false) {
    status = `wrong`;
  }
  return `<li class='stats__result stats__result--${status}'></li>`;
};

export default (answers) => {
  return [...answers, ...(new Array(LEVELS_COUNT - answers.length))].map(getStatItem).join(``);
};
