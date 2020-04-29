import {createElement} from "../../utils";
import {createPopupTemplate} from "./film-popup-tpl";

export default class FilmDetail {
  constructor(film) {
    this._film = film;

    this._element = null;
  }

  getTemplate() {
    return createPopupTemplate(this._film);
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
