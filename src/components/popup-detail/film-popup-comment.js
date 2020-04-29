import {createElement} from "../../utils";
import {createCommentPopupTemplate} from "./film-popup-comment-tpl";

export default class Comments {
  constructor(comments) {
    this._comments = comments;

    this._element = null;
  }

  getTemplate() {
    return createCommentPopupTemplate(this._comments);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
