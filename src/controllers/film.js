import FilmCardComponent from "components/main-components/film-components/film-card";
import PopupComponent from "components/main-components/popup-detail-components/film-popup-detail";
import CommentPopupComponent from "components/main-components/popup-detail-components/film-popup-comment";
import {RenderPosition, isEscPressed, Mode} from "../consts";
import {generateComments} from "mock/comments";
import {render, replace} from "utils/render";

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._filmCardComponent = null;
    this._filmPopupComponent = null;

    this._onPopupEscPress = this._onPopupEscPress.bind(this);
  }

  render(film) {

    const oldFilmComponent = this._filmCardComponent;
    const oldFilmPopupComponent = this._filmPopupComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmPopupComponent = new PopupComponent(film);

    const onClickFilmCard = (evt) => {
      switch (evt.target.className) {
        case `film-card__comments`:
        case `film-card__poster`:
        case `film-card__title`:
          this._replaceFilmToPopup(film);
          document.addEventListener(`keydown`, this._onPopupEscPress);
          break;
        default:
          break;
      }
    };

    this._filmCardComponent.setOpenPopupClickHandler(onClickFilmCard);

    const onClickFilmCardControls = (evt) => {
      evt.preventDefault();
      switch (evt.target.dataset.name) {
        case `Add to watchlist`:
          this._onDataChange(film, Object.assign({}, film, {
            isAddWatchlist: !film.isAddWatchlist
          }));
          break;
        case `Mark as watched`:
          this._onDataChange(film, Object.assign({}, film, {
            isWatched: !film.isWatched
          }));
          break;
        case `Mark as favorite`:
          this._onDataChange(film, Object.assign({}, film, {
            isFavorite: !film.isFavorite
          }));
          break;
        default:
          break;
      }
    };

    this._filmCardComponent.setFilmCardControlsClickHandler(onClickFilmCardControls);
    this._filmPopupComponent.setDetailsFilmControlsCheckBoxChangeHandler(onClickFilmCardControls);

    this._filmPopupComponent.setButtonPopupClose(() => {
      this._onButtonCloseClick();
    });

    const popupCommentElement = this._filmPopupComponent.getElement().querySelector(`.film-details__new-comment`);
    render(popupCommentElement, new CommentPopupComponent(generateComments(film.commentsCount)), RenderPosition.BEFOREBEGAN);

    if (oldFilmComponent && oldFilmPopupComponent) {
      replace(this._filmCardComponent, oldFilmComponent);
      replace(this._filmPopupComponent, oldFilmPopupComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._onButtonCloseClick();
    }
  }

  _replaceFilmToPopup() {
    this._onViewChange();
    replace(this._filmPopupComponent, this._filmCardComponent);
    this._mode = Mode.EDIT;
  }

  _onButtonCloseClick() {
    document.removeEventListener(`keydown`, this._onPopupEscPress);
    this._filmPopupComponent.reset();
    replace(this._filmCardComponent, this._filmPopupComponent);
    this._mode = Mode.DEFAULT;
  }

  _onPopupEscPress(evt) {
    if (isEscPressed(evt)) {
      this._onButtonCloseClick();
      document.removeEventListener(`keydown`, this._onPopupEscPress);
    }
  }
}
