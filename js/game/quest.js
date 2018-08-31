const initialState = {
  level: 0,
  lives: 3,
  time: 0,
};

const welcomeTemplateData = {
  title: `Лучшие художники-фотореалисты бросают тебе вызов!`,
  description: [`Нужно отличить рисунок от фотографии и сделать выбор.`, `Задача кажется тривиальной, но не думай, что все так просто.`, `Фотореализм обманчив и коварен.`, `Помни, главное — смотреть очень внимательно.`]
};

const rulesTemplateData = {
  title: `Правила`,
  setDescription() {
    return `<li>Угадай 10 раз для каждого изображения фото
    <img class="rules__icon" src="${this.images.photo}" width="32" height="31" alt="Фото"> или рисунок
    <img class="rules__icon" src="${this.images.paint}" width="32" height="31" alt="Рисунок"></li>
  <li>Фотографиями или рисунками могут быть оба изображения.</li>
  <li>На каждую попытку отводится 30 секунд.</li>
  <li>Ошибиться можно не более 3 раз.</li>`;
  },
  images: {
    photo: `img/icon-photo.png`,
    paint: `img/icon-paint.png`
  }
};

const levels = [
  {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    question: [
      {
        image: `http://i.imgur.com/1KegWPz.jpg`,
        answer: `photo`,
        name: `question1`,
        imageAlt: `Option1`
      },
      {
        image: `https://k42.kn3.net/CF42609C8.jpg`,
        answer: `paint`,
        name: `question2`,
        imageAlt: `Option2`
      }
    ],
    imageWidth: `468`,
    imageHeight: `458`,
    className: ``
  },
  {
    title: `Угадай, фото или рисунок?`,
    question: [
      {
        image: `https://k42.kn3.net/D2F0370D6.jpg`,
        answer: `photo`,
        name: `question1`,
        imageAlt: `Option1`
      }
    ],
    imageWidth: `705`,
    imageHeight: `455`,
    className: `wide`
  },
  {
    title: `Найдите рисунок среди изображений`,
    question: [
      {
        image: `http://i.imgur.com/DKR1HtB.jpg`,
        answer: true,
        imageAlt: `Option1`
      },
      {
        image: `https://k32.kn3.net/5C7060EC5.jpg`,
        answer: false,
        imageAlt: `Option2`
      },
      {
        image: `https://i.imgur.com/DiHM5Zb.jpg`,
        answer: false,
        imageAlt: `Option3`
      }
    ],
    imageWidth: `305`,
    imageHeight: `455`,
    className: `triple`
  },
  {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    question: [
      {
        image: `https://i.imgur.com/DiHM5Zb.jpg`,
        answer: `photo`,
        name: `question1`,
        imageAlt: `Option1`
      },
      {
        image: `https://k42.kn3.net/D2F0370D6.jpg`,
        answer: `paint`,
        name: `question2`,
        imageAlt: `Option2`
      }
    ],
    imageWidth: `468`,
    imageHeight: `458`,
    className: ``
  },
  {
    title: `Угадай, фото или рисунок?`,
    question: [
      {
        image: `https://k32.kn3.net/5C7060EC5.jpg`,
        answer: `paint`,
        name: `question1`,
        imageAlt: `Option1`
      }
    ],
    imageWidth: `705`,
    imageHeight: `455`,
    className: `wide`
  },
  {
    title: `Найдите рисунок среди изображений`,
    question: [
      {
        image: `https://k42.kn3.net/CF42609C8.jpg`,
        answer: true,
        imageAlt: `Option1`
      },
      {
        image: `http://i.imgur.com/1KegWPz.jpg`,
        answer: false,
        imageAlt: `Option2`
      },
      {
        image: `http://i.imgur.com/DKR1HtB.jpg`,
        answer: false,
        imageAlt: `Option3`
      }
    ],
    imageWidth: `305`,
    imageHeight: `455`,
    className: `triple`
  },
  {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    question: [
      {
        image: `http://i.imgur.com/DKR1HtB.jpg`,
        answer: `paint`,
        name: `question1`,
        imageAlt: `Option1`
      },
      {
        image: `https://k42.kn3.net/D2F0370D6.jpg`,
        answer: `paint`,
        name: `question2`,
        imageAlt: `Option2`
      }
    ],
    imageWidth: `468`,
    imageHeight: `458`,
    className: ``
  },
  {
    title: `Угадай, фото или рисунок?`,
    question: [
      {
        image: `https://k42.kn3.net/CF42609C8.jpg`,
        answer: `paint`,
        name: `question1`,
        imageAlt: `Option1`
      }
    ],
    imageWidth: `705`,
    imageHeight: `455`,
    className: `wide`
  },
  {
    title: `Найдите рисунок среди изображений`,
    question: [
      {
        image: `https://k42.kn3.net/D2F0370D6.jpg`,
        answer: true,
        imageAlt: `Option1`
      },
      {
        image: `http://i.imgur.com/1KegWPz.jpg`,
        answer: false,
        imageAlt: `Option2`
      },
      {
        image: `http://i.imgur.com/DKR1HtB.jpg`,
        answer: false,
        imageAlt: `Option3`
      }
    ],
    imageWidth: `305`,
    imageHeight: `455`,
    className: `triple`
  },
  {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    question: [
      {
        image: `http://i.imgur.com/DKR1HtB.jpg`,
        answer: `photo`,
        name: `question1`,
        imageAlt: `Option1`
      },
      {
        image: `https://k42.kn3.net/D2F0370D6.jpg`,
        answer: `paint`,
        name: `question2`,
        imageAlt: `Option2`
      }
    ],
    imageWidth: `468`,
    imageHeight: `458`,
    className: ``
  }
];

const gameStats = {
  correctPoints: 0,
  fastBonus: 0,
  slowBonus: 0,
  livesBonus: 0,
  totalPoints: 0
};

const mainScreenTemplate =
  `<section class="intro">
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`;

export {levels, rulesTemplateData, welcomeTemplateData, initialState, gameStats, mainScreenTemplate};
