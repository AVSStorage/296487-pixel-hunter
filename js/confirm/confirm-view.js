import AbstractView from '../abstract-view';

const Action = {
  OK: `Ок`,
  CANCEL: `Отмена`
};

export default class ConfirmView extends AbstractView {

  get template() {
    return `  <section class="modal">
        <form class="modal__inner">
          <button class="modal__close" type="button">
            <span class="visually-hidden">Закрыть</span>
          </button>
          <h2 class="modal__title">Подтверждение</h2>
          <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
          <div class="modal__button-wrapper">
            <button class="modal__btn">Ок</button>
            <button class="modal__btn">Отмена</button>
          </div>
        </form>
      </section>`;
  }

  bind() {
    this.element.querySelector(`form`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.classList.contains(`modal__close`)) {
        this.onCancel();
        return;
      }
      const action = evt.target.closest(`.modal__btn`).textContent;
      if (action === Action.OK) {
        this.onOk();
      }
      if (action === Action.CANCEL) {
        this.onCancel();
      }
    });
  }
  onOk() {

  }
  onCancel() {

  }
}
