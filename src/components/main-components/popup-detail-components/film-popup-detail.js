import AbstractSmartComponent from "components/abstract-smart-component";
import {createPopupTemplate} from "./film-popup-tpl";

export default class FilmDetail extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;

    // this._subscribeOnEvents();
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  recoveryListeners() {
    // this.setButtonPopupClose();
    // this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  setButtonPopupClose(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }

  // _subscribeOnEvents() {
  //   const element = this.getElement();
  //
  //   element.querySelector(`input[name = watchlist]`)
  //     .addEventListener(`change`, () => {
  //       this._isAddWatchlist = !this._isAddWatchlist;
  //
  //       this.rerender();
  //     });
  //
  //   element.querySelector(`input[name = watchlist]`)
  //     .addEventListener(`change`, () => {
  //       this._isWatched = !this._isWatched;
  //
  //       this.rerender();
  //     });
  //
  //   element.querySelector(`input[name = favorite]`)
  //     .addEventListener(`change`, () => {
  //       this._isFavorite = !this._isFavorite;
  //
  //       this.rerender();
  //     });
  // }

  setAddWatchlistCheckBoxChangeHandler(handler) {
    this.getElement().querySelector(`input[name = watchlist]`)
      .addEventListener(`change`, handler);
  }

  setAlredyWatchedCheckBoxChangeHandler(handler) {
    this.getElement().querySelector(`input[name = watched]`)
      .addEventListener(`change`, handler);
  }

  setAddFavoriteCheckBoxChangeHandler(handler) {
    this.getElement().querySelector(`input[name = favorite]`)
      .addEventListener(`change`, handler);
  }

  // setCheckBoxChangeHandler(handler) {
  //   this.getElement().querySelectorAll(`.film-details__control-input`).forEach((checkbox) => {
  //     checkbox.addEventListener(`change`, handler);
  //   });
  // }
}
