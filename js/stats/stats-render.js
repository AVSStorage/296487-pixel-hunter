
const getStatItem = (answer) => {

  let status = `unknown`;

  if (answer) {
    status = `correct`;
  } else if (answer === false) {
    status = `wrong`;
  }


  return `<li class='stats__result stats__result--${status}'></li>`;
};

export default (answers) => {
  return [...answers, ...(new Array(10 - answers.length))].map(getStatItem).join(``);
};
