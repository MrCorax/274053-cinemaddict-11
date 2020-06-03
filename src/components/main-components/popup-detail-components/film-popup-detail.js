import AbstractSmartComponent from "components/abstract-smart-component";
import {createPopupTemplate} from "./film-popup-tpl";

export default class FilmDetail extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;

    this._changeHandler = null;
    this._clickHandler = null;
    this._isEmojiActive = null;
    this._emojiName = null;
    this._emojiSrc = null;
    this._changeEmojiLabel();
  }

  getTemplate() {
    return createPopupTemplate(this._film, {
      isEmojiActive: this._isEmojiActive,
      emojiName: this._emojiName,
      emojiSrc: this._emojiSrc
    });
  }

  recoveryListeners() {
    this.setDetailsFilmControlsCheckBoxChangeHandler(this._changeHandler);
    this.setButtonPopupClose(this._clickHandler);
    this._changeEmojiLabel();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this._isEmojiActive = null;
    this._emojiName = null;
    this._emojiSrc = null;

    this.rerender();
  }

  setButtonPopupClose(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._clickHandler = handler;
  }

  _changeEmojiLabel() {
    this.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, (evt) => {
        this._isEmojiActive = evt.target.checked;
        this._emojiName = evt.target.id;
        this._emojiSrc = evt.target.nextElementSibling.lastElementChild.src;

        this.rerender();
      });
  }

  setDetailsFilmControlsCheckBoxChangeHandler(handler) {
    this.getElement().querySelector(`.film-details__controls`)
      .addEventListener(`change`, handler);
    this._changeHandler = handler;
  }
}
