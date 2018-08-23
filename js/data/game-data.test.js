import {assert} from 'chai';
import {changeLevel, countPoints, INITIAL_GAME, manageLives} from './game-data';

describe(`Check level changer`, () => {

  it(`should update level of the game`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 1).level, 1);
    assert.equal(changeLevel(INITIAL_GAME, 2).level, 2);
    assert.equal(changeLevel(INITIAL_GAME, 10).level, 10);
    assert.equal(changeLevel(INITIAL_GAME, 102).level, 102);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, -1).level, /Level should not be negative value/);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, []).level, /Level should be of type number/);
  });

});

describe(`Counting total points`, () => {
  it(`should be ten answers`, () => {
    assert.throws(() => {
      countPoints([
        {
          value: true,
          time: `fast`
        },
        {
          value: true,
          time: `fast`
        },
        {
          value: true,
          time: null
        }
      ], 1);
    }, Error);
  });
  it(`should not be more then ten answers`, () => {
    assert.throws(() => {
      countPoints([
        {
          value: true,
          time: `fast`
        },
        {
          value: true,
          time: `fast`
        },
        {
          value: true,
          time: null
        },
        {
          value: false,
          time: null
        },
        {
          value: true,
          time: `slow`
        },
        {
          value: false,
          time: null
        },
        {
          value: false,
          time: null
        },
        {
          value: true,
          time: `fast`
        },
        {
          value: false,
          time: null
        },
        {
          value: false,
          time: null
        },
        {
          value: false,
          time: null
        }
      ], 1);
    }, Error);
  });
  it(`should count points correctly`, () => {
    assert.equal(
        countPoints([
          {
            value: true,
            time: `fast`
          },
          {
            value: true,
            time: `fast`
          },
          {
            value: true,
            time: null
          },
          {
            value: false,
            time: null
          },
          {
            value: true,
            time: `slow`
          },
          {
            value: false,
            time: null
          },
          {
            value: false,
            time: null
          },
          {
            value: true,
            time: `fast`
          },
          {
            value: false,
            time: null
          },
          {
            value: false,
            time: null
          }
        ], 1), 650);
    assert.equal(
        countPoints([
          {
            value: true,
            time: null
          },
          {
            value: true,
            time: null
          },
          {
            value: true,
            time: null
          },
          {
            value: true,
            time: null
          },
          {
            value: true,
            time: null
          },
          {
            value: true,
            time: null
          },
          {
            value: true,
            time: null
          },
          {
            value: true,
            time: null
          },
          {
            value: true,
            time: null
          },
          {
            value: true,
            time: null
          }
        ], 3), 1150);
    assert.equal(
        countPoints([
          {
            value: true,
            time: null
          },
          {
            value: true,
            time: `slow`
          },
          {
            value: true,
            time: null
          },
          {
            value: true,
            time: null
          },
          {
            value: null,
            time: null
          },
          {
            value: true,
            time: null
          },
          {
            value: false,
            time: null
          },
          {
            value: true,
            time: null
          },
          {
            value: true,
            time: `fast`
          },
          {
            value: false,
            time: `slow`
          }
        ], 0), 700);


  });
  it(`should not crash a program with non number value`, () => {
    assert.equal(
        countPoints([
          {
            value: true,
            time: null
          },
          {
            value: true,
            time: `slow`
          },
          {
            value: true,
            time: null
          },
          {
            value: true,
            time: `fast`
          },
          {
            value: null,
            time: null
          },
          {
            value: true,
            time: null
          },
          {
            value: false,
            time: null
          },
          {
            value: true,
            time: `fast`
          },
          {
            value: true,
            time: `fast`
          },
          {
            value: false,
            time: `slow`
          }
        ], undefined), 800);
  });

});

describe(`Manage game lives`, () => {

  it(`should update lives`, () => {
    assert.equal(manageLives(INITIAL_GAME, 1).lives, 1);
    assert.equal(manageLives(INITIAL_GAME, 2).lives, 2);
    assert.equal(manageLives(INITIAL_GAME, 3).lives, 3);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => manageLives(INITIAL_GAME, -1).lives, Error);
  });

  it(`should not be more then three values`, () => {
    assert.throws(() => manageLives(INITIAL_GAME, 4).lives, Error);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => manageLives(INITIAL_GAME, []).lives, Error);
  });

});
