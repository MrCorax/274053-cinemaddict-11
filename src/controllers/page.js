import SortComponent from "components/main-components/sort";
import NoFilmSectionComponent from "components/main-components/film-components/no-films";
import FilmsContainerComponent from "components/main-components/film-components/films-container";
import FilmListComponent from "components/main-components/film-components/film-list";
import FilmExtraListComponent from "components/main-components/film-components/film-extra-list";
import ShowMoreBtnComponent from "components/main-components/film-components/btn-card";
import MovieController from "./film.js";
import {FilmSetting, RenderPosition, BlockName, Count, SortType} from "../consts";
import {render, remove} from "utils/render";

const renderFilms = (filmContainerElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmContainerElement, onDataChange, onViewChange);

    movieController.render(film);

    return movieController;
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
    default:
      break;
  }
  return sortedFilms.slice(from, to);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showedMovieControllers = [];
    this._showingFilmsCount = FilmSetting.SHOWING_FILM_COUNT_ON_START;
    this._sortComponent = new SortComponent();
    this._noFilmSectionComponent = new NoFilmSectionComponent();
    this._filmListComponent = new FilmListComponent();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._showMoreBtnComponent = new ShowMoreBtnComponent();
    this._filmExtraListTopRatedComponent = new FilmExtraListComponent(BlockName.TOP_RATED);
    this._filmExtraListMostCommentedComponent = new FilmExtraListComponent(BlockName.MOST_COMMENTED);

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(filmInfo) {
    this._films = filmInfo;
    const container = this._container.getElement();

    render(container, this._sortComponent, RenderPosition.BEFOREBEGAN);

    if (!Count.FILMS) {
      render(container, this._noFilmSectionComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._filmListComponent, RenderPosition.BEFOREEND);
    const filmListElement = this._filmListComponent.getElement();

    render(filmListElement, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    const filmContainerElement = this._filmsContainerComponent.getElement();

    const newFilms = renderFilms(filmContainerElement, this._films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

    render(container, this._filmExtraListTopRatedComponent, RenderPosition.BEFOREEND);
    render(container, this._filmExtraListMostCommentedComponent, RenderPosition.BEFOREEND);

    //  рендер Top rated/Most commented
    const filmListExtraElement = container.querySelectorAll(`.films-list--extra`);
    filmListExtraElement.forEach((element) => {
      const isTopRated = element.querySelector(`.films-list__title`).textContent === BlockName.TOP_RATED;
      const isMostCommented = element.querySelector(`.films-list__title`).textContent === BlockName.MOST_COMMENTED;
      render(element, new FilmsContainerComponent(), RenderPosition.BEFOREEND);
      const filmExtraContainerElements = element.querySelector(`.films-list__container`);

      if (isTopRated) {
        const topRatedFilmInfo = this._films.slice().sort((a, b) => b.raiting - a.raiting);
        renderFilms(filmExtraContainerElements, topRatedFilmInfo.slice(0, filmListExtraElement.length), this._onDataChange, this._onViewChange);
      } else if (isMostCommented) {
        const mostCommentedFilmInfo = this._films.slice().sort((a, b) => b.commentsCount - a.commentsCount);
        renderFilms(filmExtraContainerElements, mostCommentedFilmInfo.slice(0, filmListExtraElement.length), this._onDataChange, this._onViewChange);
      }
    });

    this._renderShowMoreBtn();
  }

  _renderShowMoreBtn() {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }

    const filmListElement = this._filmListComponent.getElement();
    render(filmListElement, this._showMoreBtnComponent, RenderPosition.BEFOREEND);

    this._showMoreBtnComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      const filmContainerElement = this._filmsContainerComponent.getElement();
      this._showingFilmsCount = this._showingFilmsCount + FilmSetting.SHOWING_FILM_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(this._films, this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
      const newFilms = renderFilms(filmContainerElement, sortedFilms, this._onDataChange, this._onViewChange);

      this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreBtnComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = FilmSetting.SHOWING_FILM_COUNT_ON_START;

    const sortedFilms = getSortedFilms(this._films, sortType, 0, this._showingFilmsCount);
    const filmContainerElement = this._filmsContainerComponent.getElement();

    filmContainerElement.innerHTML = ``;

    const newFilms = renderFilms(filmContainerElement, sortedFilms, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = newFilms;

    this._renderShowMoreBtn();
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    this._showedMovieControllers[index].render(this._films[index]);
  }
}
