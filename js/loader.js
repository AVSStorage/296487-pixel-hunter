import adaptServerData from './game/adapter';
import resize from './resize/resize';

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const DEFAULT_NAME = `nekki`;
const APP_ID = 22101985;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};


const toJSON = (response) => response.json();


const loadImage = (dataImage) => {
  return new Promise((onSuccess, onError) => {
    const image = new Image();
    image.src = dataImage.url;

    image.onload = () => {
      const imageSize = resize({width: dataImage.width, height: dataImage.height}, {width: image.width, height: image.height});

      dataImage.width = imageSize.width;
      dataImage.height = imageSize.height;

      onSuccess(dataImage);
    };

    image.onerror = () => {
      onError(`Картинка не загружена ${dataImage.url}`);
    };
  });
};

const preloadImages = (data) => {
  const answers = [];

  data.forEach((it) => {
    return answers.push(...it.answers);
  });

  const images = answers.map((answer) => {
    return loadImage(answer.image);
  });

  return Promise.all(images)
      .then(() => Promise.resolve(data));
};

export default class Loader {
  static loadData() {
    return window.fetch(`${SERVER_URL}/questions`)
        .then(checkStatus)
        .then(toJSON)
        .then(adaptServerData)
        .then(preloadImages);
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    return window.fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings)
        .then(checkStatus);
  }

  static loadResults(name = DEFAULT_NAME) {
    return window.fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`)
        .then(checkStatus)
        .then(toJSON);
  }
}
