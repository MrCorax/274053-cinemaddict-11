import AbstractComponent from "components/abstract-component";
import {createCommentPopupTemplate} from "./film-popup-comment-tpl";

export default class Comments extends AbstractComponent {
  constructor(comments) {
    super();

    this._comments = comments;
  }

  getTemplate() {
    return createCommentPopupTemplate(this._comments);
  }
}
