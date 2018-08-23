export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 2,
  time: 0
});

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
  if (answers.length < 10 || answers.length > 10) {
    throw new Error(`There are should be ten answers`);
  } else {
    const points = answers.map((answer) => {
      let newPoint = 0;
      if (answer.value) {
        newPoint = newPoint + 100;
        if (answer.time === `fast`) {
          newPoint = newPoint + 50;
        } else if (answer.time === `slow`) {
          newPoint = newPoint - 50;
        }
      }
      return newPoint;
    });

    let totalPoints = points.reduce((currentPoint, nextPoint) => currentPoint + nextPoint);
    if (lifes) {
      totalPoints = totalPoints + lifes * 50;
    }
    return totalPoints;
  }
};

export {changeLevel, countPoints};
