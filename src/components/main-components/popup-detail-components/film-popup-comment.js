import AbstractComponent from "components/abstract-component";

const createCommentPopupMarkup = (comment) => {
  const {commentText, emotion, commentAuthor, commentDate} = comment;
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emotion}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${commentAuthor}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createCommentPopupTemplate = (comments) => {
  const commentPopupMarkup = comments.map((it) => createCommentPopupMarkup(it)).join(`\n`);

  return (
    `<ul class="film-details__comments-list">
      ${commentPopupMarkup}
    </ul>`
  );
};

export default class Comments extends AbstractComponent {
  constructor(comments) {
    super();

    this._comments = comments;
  }

  getTemplate() {
    return createCommentPopupTemplate(this._comments);
  }
}
