
const getStatItem = (answer) => {
  let status = `unknown`;

  if (answer) {
    status = answer;
  }


  return `<li class='stats__result stats__result--${status}'></li>`;
};

export default (answers) => {
  return [...answers, ...(new Array(10 - answers.length))].map(getStatItem).join(``);
};
