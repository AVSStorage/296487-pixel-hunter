const LEVELS_COUNT = 10;
const REQUIRED_ANSWERS_COUNT = 2;
const LIVES_COUNT = 3;

const GamePoints = {
  BONUS_POINT: 50,
  ANSWER_POINT: 100
};

const AnswerType = {
  PHOTO: `photo`,
  PAINT: `paint`
};
const Time = {
  START: 30,
  CRITICAL: 5,
  FREQUENCY: 1000
};

const AnswerTime = {
  SLOW: 20,
  FAST: 10
};

const initialState = {
  level: 0,
  lives: LIVES_COUNT,
  time: Time.START,
  answers: []
};

const QuestionType = {
  GUESS_TWO: `two-of-two`,
  GUESS_ONE: `tinder-like`,
  FIND: `one-of-three`
};


export {LEVELS_COUNT, GamePoints, REQUIRED_ANSWERS_COUNT, AnswerType, QuestionType, LIVES_COUNT, Time, AnswerTime, initialState};