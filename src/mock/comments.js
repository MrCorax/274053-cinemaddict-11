import {PEOPLE, TEXT_COMMENTS, COMMENT_EMOTIONS} from "../const.js";
import {getRandomArrayItem, getRandomCommentDate} from "../utils.js";
const newCommentDate = new Date();

const generateComment = () => {
  return {
    commentText: TEXT_COMMENTS[getRandomArrayItem(TEXT_COMMENTS)],
    emotion: COMMENT_EMOTIONS[getRandomArrayItem(COMMENT_EMOTIONS)],
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
