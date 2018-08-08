'use strict';

const RIGHT_ARROW = 37;
const LEFT_ARROW = 39;

const mainElement = document.querySelector(`#main`);

let arrows = `<div class="arrows__wrap">
<style>
  .arrows__wrap {
    position: absolute;
    top: 95px;
    left: 50%;
    margin-left: -56px;
  }
  .arrows__btn {
    background: none;
    border: 2px solid black;
    padding: 5px 20px;
  }
</style>
<button class="arrows__btn"><-</button>
<button class="arrows__btn">-></button>
</div>`;

const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

const screens = Array.from(document.querySelectorAll(`template`)).
  map((it) => it.content);

let current = 0;
const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectSlide(screens[current]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      select(current - 1);
      break;
    case LEFT_ARROW:
      select(current + 1);
      break;
  }
});

select(0);
document.body.insertAdjacentHTML(`beforeend`, arrows);

arrows = document.querySelectorAll(`.arrows__btn`);

arrows.forEach((arrow) => arrow.addEventListener(`click`, (evt) => {
  switch (evt.target.textContent) {
    case `->`:
      select(current + 1);
      break;
    case `<-`:
      select(current - 1);
      break;
  }
}));


