import {PEOPLE, COMMENT_TEXT, COMMENT_EMOTION} from "../const.js";
import {getRandomArrayItem, getRandomCommentDate} from "../utils.js";
const newCommentDate = new Date();

const generateComment = () => {
  return {
    commentText: COMMENT_TEXT[getRandomArrayItem(COMMENT_TEXT)],
    emotion: COMMENT_EMOTION[getRandomArrayItem(COMMENT_EMOTION)],
    commentAuthor: PEOPLE[getRandomArrayItem(PEOPLE)],
    commentDate: getRandomCommentDate(newCommentDate),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments};
