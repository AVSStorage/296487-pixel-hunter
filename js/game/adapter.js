import {AnswerType, QuestionType} from '../settings';
const serverTitleToClientTitle = {
  'two-of-two': QuestionType.GUESS_TWO,
  'one-of-three': QuestionType.FIND,
  'tinder-like': QuestionType.GUESS_ONE
};

const serverAnswerTypeToClientAnswerType = {
  'painting': AnswerType.PAINT,
  'photo': AnswerType.PHOTO
};

const formatAnswers = (answers) => {
  return answers.map((it) => {
    return Object.assign({}, it, {
      type: serverAnswerTypeToClientAnswerType[it.type]
    });
  });
};

const formatQuestion = (data) => {
  return {
    type: serverTitleToClientTitle[data.type],
    title: data.question,
    answers: formatAnswers(data.answers)
  };
};

export default (data) => {
  return data.map((question) => {
    return formatQuestion(question);
  });
};
