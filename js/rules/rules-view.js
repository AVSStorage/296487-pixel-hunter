import AbstractView from '../abstract-view';

export default class RulesView extends AbstractView {
  get template() {
    return `
            <div class='rules'>
              <h1 class='rules__title'>Правила</h1>
              <p class='rules__description'>Угадай 10 раз для каждого изображения фото <img
                src='img/icon-photo.png' width='16' height='16'> или рисунок <img
                src='img/icon-paint.png' width='16' height='16' alt=''>.<br>
                Фотографиями или рисунками могут быть оба изображения.<br>
                На каждую попытку отводится 30 секунд.<br>
                Ошибиться можно не более 3 раз.<br>
                <br>
                Готовы?
              </p>
              <form class='rules__form'>
                <input class='rules__input' type='text' placeholder='Ваше Имя'>
                <button class='rules__button  continue' type='submit' disabled>Go!</button>
              </form>
            </div>`;
  }

  bind() {
    const form = this.element.querySelector(`.rules__form`);
    const input = form.querySelector(`.rules__input`);
    const submitButton = form.querySelector(`.rules__button`);

    input.addEventListener(`input`, (evt) => {
      const value = evt.target.value;

      if (value.length) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    });

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this.goNextScreen(input.value);
    });
  }

  goNextScreen() {
  }
}
