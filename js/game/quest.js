const initialState = {
  level: 0,
  lives: 3,
  time: 0,
  answers: []
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

export {levels, initialState, gameStats};
