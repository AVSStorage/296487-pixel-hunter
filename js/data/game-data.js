const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 0,
  time: 0
});

const ANSWERS_COUNT = 10;
const TIME_POINT = 50;
const LIVE_POINT = 50;
const LIVES_COUNT = 3;

const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }

  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }

  const newGame = Object.assign({}, game, {
    level
  });
  return newGame;
};

const countPoints = (answers, lifes) => {
  if (answers.length < ANSWERS_COUNT || answers.length > ANSWERS_COUNT) {
    throw new Error(`There are should be ten answers`);
  } else {
    const points = answers.map((answer) => {
      let newPoint = 0;
      if (answer.value && answer.time) {
        return answer.time === `fast` ?
          newPoint + TIME_POINT :
          newPoint - TIME_POINT;
      }
      return newPoint;
    });

    let totalPoints = points.reduce((currentPoint, nextPoint) => currentPoint + nextPoint);

    if (lifes) {
      totalPoints = totalPoints + lifes * LIVE_POINT;
    }

    return totalPoints;
  }
};

const manageLives = (game, lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`Lives should be of type number`);
  }

  if (lives > LIVES_COUNT) {
    throw new Error(`There are should not be more than three values`);
  }
  if (lives < 0) {
    throw new Error(`There are should not be negative values`);
  }

  const newGame = Object.assign({}, game, {
    lives
  });
  return newGame;
};

export {changeLevel, countPoints, INITIAL_GAME, manageLives};
