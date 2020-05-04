import AbstractComponent from "Components/abstract-component";
import {createPopupTemplate} from "./film-popup-tpl";

export default class FilmDetail extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  setButtonPopupClose(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }
}
