
const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

const mainElement = document.querySelector(`#main`);

const getElementFromTemplate = (html) => {
  const element = document.createElement(`div`);
  element.innerHTML = html;
  return element;
};


export {changeScreen, getElementFromTemplate};
