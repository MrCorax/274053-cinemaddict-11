import SortComponent from "MainComponents/sort";
import {SortType, isEscPressed} from "../consts";
import NoFilmSectionComponent from "FilmComponents/no-films";
import FilmsContainerComponent from "FilmComponents/films-container";
import FilmCardComponent from "FilmComponents/film-card";
import FilmListComponent from "FilmComponents/film-list";
import FilmExtraListComponent from "FilmComponents/film-extra-list";
import ShowMoreBtnComponent from "FilmComponents/btn-card";
import PopupComponent from "PopupDetail/film-popup-detail";
import CommentPopupComponent from "PopupDetail/film-popup-comment";
import {siteFooterElement} from "../main";
import {FilmSetting, RenderPosition} from "../consts";
import {generateComments} from "Mock/comments";
import {render, remove} from "Utils/render";

const renderFilmCard = (filmContainerElement, film) => {

  const onFilmCardClick = () => {
    const popupComponent = new PopupComponent(film);
    const body = document.querySelector(`body`);

    if (body.querySelector(`.film-details`)) {
      body.querySelector(`.film-details`).remove();
    }

    render(siteFooterElement, popupComponent, RenderPosition.AFTEREND);
    const popupFormElement = popupComponent.getElement().querySelector(`.film-details__inner`);
    render(popupFormElement, new CommentPopupComponent(generateComments(film.commentsCount)), RenderPosition.BEFOREEND);

    const onPopupEscPress = (evt) => {

      if (isEscPressed(evt)) {
        onButtonCloseClick();
        document.removeEventListener(`keydown`, onPopupEscPress);
      }
    };

    document.addEventListener(`keydown`, onPopupEscPress);

    const onButtonCloseClick = () => {
      remove(popupComponent);
      document.removeEventListener(`keydown`, onPopupEscPress);
    };
    popupComponent.setButtonPopupClose(() => {
      onButtonCloseClick();
    });
  };

  const filmCardComponent = new FilmCardComponent(film);
  filmCardComponent.setOpenPopupByPoster(() => {
    onFilmCardClick();
  });
  filmCardComponent.setOpenPopupByTitle(() => {
    onFilmCardClick();
  });
  filmCardComponent.setOpenPopupByComments(() => {
    onFilmCardClick();
  });

  render(filmContainerElement, filmCardComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (filmContainerElement, films) => {
  films.forEach((film) => {
    renderFilmCard(filmContainerElement, film);
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.SORT_BY_DATE:
      sortedFilms = showingFilms.sort((a, b) =>
        b.dateOfIssue.substring(b.dateOfIssue.length - 4) - a.dateOfIssue.substring(a.dateOfIssue.length - 4));
      break;
    case SortType.SORT_BY_RATING:
      sortedFilms = showingFilms.sort((a, b) => b.raiting - a.raiting);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }
  return sortedFilms.slice(from, to);
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent();
    this._noFilmSectionComponent = new NoFilmSectionComponent();
    this._filmListComponent = new FilmListComponent();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._showMoreBtnComponent = new ShowMoreBtnComponent();
    this._filmExtraListTopRatedComponent = new FilmExtraListComponent(`Top Rated`);
    this._filmExtraListMostCommentedComponent = new FilmExtraListComponent(`Most Commented`);
  }

  render(filmInfo) {
    const renderShowMoreBtn = () => {
      if (showingFilmsCount >= filmInfo.length) {
        return;
      }

      render(filmListElement, this._showMoreBtnComponent, RenderPosition.BEFOREEND);

      this._showMoreBtnComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + FilmSetting.SHOWING_FILM_COUNT_BY_BUTTON;

        const sortedFilms = getSortedFilms(filmInfo, this._sortComponent.getSortType(), prevFilmsCount, showingFilmsCount);

        renderFilms(filmContainerElement, sortedFilms);

        if (showingFilmsCount >= filmInfo.length) {
          remove(this._showMoreBtnComponent);
        }
      });
    };
    const container = this._container.getElement();

    render(container, this._sortComponent, RenderPosition.BEFOREBEGAN);

    const isNoFilmInDataBase = FilmSetting.COUNT === 0;

    if (isNoFilmInDataBase) {
      render(container, this._noFilmSectionComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._filmListComponent, RenderPosition.BEFOREEND);
    const filmListElement = this._filmListComponent.getElement();

    render(filmListElement, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    const filmContainerElement = this._filmsContainerComponent.getElement();

    let showingFilmsCount = FilmSetting.SHOWING_FILM_COUNT_ON_START;
    renderFilms(filmContainerElement, filmInfo.slice(0, showingFilmsCount));

    render(container, this._filmExtraListTopRatedComponent, RenderPosition.BEFOREEND);
    render(container, this._filmExtraListMostCommentedComponent, RenderPosition.BEFOREEND);

    const filmListExtraElement = container.querySelectorAll(`.films-list--extra`);

    filmListExtraElement.forEach((element) => {
      const isTopRated = element.querySelector(`.films-list__title`).textContent === `Top Rated`;
      const isMostCommented = element.querySelector(`.films-list__title`).textContent === `Most Commented`;
      render(element, new FilmsContainerComponent(), RenderPosition.BEFOREEND);
      const filmExtraContainerElements = element.querySelector(`.films-list__container`);

      if (isTopRated) {
        const topRatedFilmInfo = filmInfo.slice().sort((a, b) => b.raiting - a.raiting);
        renderFilms(filmExtraContainerElements, topRatedFilmInfo.slice(0, filmListExtraElement.length));
      } else if (isMostCommented) {
        const mostCommentedFilmInfo = filmInfo.slice().sort((a, b) => b.commentsCount - a.commentsCount);
        renderFilms(filmExtraContainerElements, mostCommentedFilmInfo.slice(0, filmListExtraElement.length));
      }
    });

    renderShowMoreBtn();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = FilmSetting.SHOWING_FILM_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(filmInfo, sortType, 0, showingFilmsCount);

      filmContainerElement.innerHTML = ``;

      renderFilms(filmContainerElement, sortedFilms);
      renderShowMoreBtn();
    });
  }
}
