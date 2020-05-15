import FilmCardComponent from "components/main-components/film-components/film-card";
import PopupComponent from "components/main-components/popup-detail-components/film-popup-detail";
import CommentPopupComponent from "components/main-components/popup-detail-components/film-popup-comment";
import {RenderPosition, isEscPressed} from "../consts";
import {generateComments} from "mock/comments";
import {siteFooterElement} from "../main";
import {render, remove} from "utils/render";

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmCardComponent = null;
    this._popupComponent = null;

    this._onPopupEscPress = this._onPopupEscPress.bind(this);
  }

  render(film) {

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmCardComponent.setOpenPopupByPoster(() => {
      this._onFilmCardClick(film);
    });
    this._filmCardComponent.setOpenPopupByTitle(() => {
      this._onFilmCardClick(film);
    });
    this._filmCardComponent.setOpenPopupByComments(() => {
      this._onFilmCardClick(film);
    });

    this._filmCardComponent.setAddWatchlistBtnClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isAddWatchlist: !film.isAddWatchlist,
      }));
    });

    this._filmCardComponent.setAlredyWatchedBtnClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmCardComponent.setAddFavoritesBtnClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  _onFilmCardClick(film) {
    this._popupComponent = new PopupComponent(film);
    const body = document.querySelector(`body`);

    if (body.querySelector(`.film-details`)) {
      body.querySelector(`.film-details`).remove();
    }

    render(siteFooterElement, this._popupComponent, RenderPosition.AFTEREND);
    const popupFormElement = this._popupComponent.getElement().querySelector(`.film-details__inner`);
    render(popupFormElement, new CommentPopupComponent(generateComments(film.commentsCount)), RenderPosition.BEFOREEND);

    document.addEventListener(`keydown`, this._onPopupEscPress);

    this._popupComponent.setButtonPopupClose(() => {
      this._onButtonCloseClick();
    });

    this._popupComponent.setAddWatchlistCheckBoxChangeHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAddWatchlist: !film.isAddWatchlist,
      }));
    });

    this._popupComponent.setAlredyWatchedCheckBoxChangeHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._popupComponent.setAddFavoriteCheckBoxChangeHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

  }

  _onButtonCloseClick() {
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._onPopupEscPress);
  }

  _onPopupEscPress(evt) {
    if (isEscPressed(evt)) {
      this._onButtonCloseClick();
      document.removeEventListener(`keydown`, this._onPopupEscPress);
    }
  }
}
