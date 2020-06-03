import AbstractComponent from "components/abstract-component";
import {Count} from "../../../consts";

const createButtonMarkup = (className, name, isActive = true) => {
  return (
    `<button class="film-card__controls-item
      button film-card__controls-item--${className} ${isActive ? `` : `film-card__controls-item--active`}" data-name="${name}"
      >${name}</button>`
  );
};

const createFilmCardTemplate = (film) => {
  const {poster, filmTitle, raiting, dateOfIssue, duration, movieGenre, description, commentsCount} = film;
  const year = dateOfIssue.substring(dateOfIssue.length - 4);
  const lengthDescription = description.length >= Count.SYMBOLS ? description.substring(0, Count.SYMBOLS) + `...` : description;
  const addWatchlistButton = createButtonMarkup(`add-to-watchlist`, `Add to watchlist`, !film.isAddWatchlist);
  const watchedButton = createButtonMarkup(`mark-as-watched`, `Mark as watched`, !film.isWatched);
  const addFavoriteButton = createButtonMarkup(`favorite`, `Mark as favorite`, !film.isFavorite);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmTitle}</h3>
      <p class="film-card__rating">${raiting}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${movieGenre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${lengthDescription}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        ${addWatchlistButton}
        ${watchedButton}
        ${addFavoriteButton}
      </form>
    </article>`
  );
};

export default class Film extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  // обработчик открытия попапа
  setOpenPopupClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  // обработчик кнопок «Add to watchlist», «Already watched», «Add to favorites»
  setFilmCardControlsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls`)
      .addEventListener(`click`, handler);
  }
}
