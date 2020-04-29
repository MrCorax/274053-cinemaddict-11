import UserLevelComponent from "Components/user-level";
import MainNavigationComponent from "Components/main-navigation";
import SortComponent from "Components/sort";
import FilmSectionComponent from "Components/film-section";
import NoFilmSectionComponent from "Components/no-films";
import FilmsContainerComponent from "Components/films-container";
import FilmCardComponent from "Components/film-card";
import FilmListComponent from "Components/film-list";
import FilmExtraListComponent from "Components/film-extra-list";
import ShowMoreBtnComponent from "Components/btn-card";
import FooterStatisticsComponent from "Components/footer-statistics";
import PopupComponent from "Components/popup-detail/film-popup-detail";
import CommentPopupComponent from "Components/popup-detail/film-popup-comment";
import {generateNavigation} from "Mock/navigation";
import {generateFilms} from "Mock/film-object";
import {generateComments} from "Mock/comments";
import {render} from "./utils";
import {FilmSetting, RenderPosition} from "./consts";

const renderFilmCard = (filmContainerElement, film) => {

  const onFilmCardClick = () => {
    const popupComponent = new PopupComponent(film);
    const body = document.querySelector(`body`);

    if (body.querySelector(`.film-details`)) {
      body.querySelector(`.film-details`).remove();
    }

    render(siteFooterElement, popupComponent.getElement(), RenderPosition.AFTEREND);
    const popupFormElement = popupComponent.getElement().querySelector(`.film-details__inner`);
    render(popupFormElement, new CommentPopupComponent(generateComments(film.commentsCount)).getElement(), RenderPosition.BEFOREEND);

    const onPopupEscPress = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        onButtonCloseClick();
        document.removeEventListener(`keydown`, onPopupEscPress);
      }
    };

    document.addEventListener(`keydown`, onPopupEscPress);

    const buttonPopupClose = popupComponent.getElement().querySelector(`.film-details__close-btn`);
    const onButtonCloseClick = () => {
      popupComponent.getElement().remove();
      popupComponent.removeElement();
      document.removeEventListener(`keydown`, onPopupEscPress);
    };
    buttonPopupClose.addEventListener(`click`, onButtonCloseClick);
  };

  const filmCardComponent = new FilmCardComponent(film);
  const openPopupByPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const openPopupByTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const openPopupByComments = filmCardComponent.getElement().querySelector(`.film-card__comments`);
  const forPopupOpen = [openPopupByPoster, openPopupByTitle, openPopupByComments];

  forPopupOpen.forEach((element) => {
    element.addEventListener(`click`, onFilmCardClick);
  });

  render(filmContainerElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmSection = (filmSectionComponent, filmInfo) => {

  const isNoFilmInDataBase = FilmSetting.COUNT === 0;

  if (isNoFilmInDataBase) {
    render(filmSectionComponent.getElement(), new NoFilmSectionComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(filmSectionComponent.getElement(), new FilmListComponent().getElement(), RenderPosition.BEFOREEND);
  const filmListElement = filmSectionComponent.getElement().querySelector(`.films-list`);

  render(filmListElement, new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);
  const filmContainerElement = filmListElement.querySelector(`.films-list__container`);

  let showingFilmsCount = FilmSetting.SHOWING_FILM_COUNT_ON_START;
  filmInfo.slice(0, showingFilmsCount)
    .forEach((film) => {
      renderFilmCard(filmContainerElement, film);
    });

  const renderFilmExtraCard = (blockName) => {
    render(filmSectionComponent.getElement(), new FilmExtraListComponent(blockName).getElement(), RenderPosition.BEFOREEND);
  };
  renderFilmExtraCard(`Top Rated`);
  renderFilmExtraCard(`Most Commented`);

  const filmListExtraElement = filmSectionComponent.getElement().querySelectorAll(`.films-list--extra`);

  filmListExtraElement.forEach((element) => {
    const isTopRated = element.querySelector(`.films-list__title`).textContent === `Top Rated`;
    const isMostCommented = element.querySelector(`.films-list__title`).textContent === `Most Commented`;
    render(element, new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);
    const filmExtraContainerElements = element.querySelector(`.films-list__container`);

    if (isTopRated) {
      const topRatedFilmInfo = filmInfo.slice().sort((a, b) => b.raiting - a.raiting);
      topRatedFilmInfo.slice(0, filmListExtraElement.length).forEach((film) => {
        renderFilmCard(filmExtraContainerElements, film);
      });
    } else if (isMostCommented) {
      const mostCommentedFilmInfo = filmInfo.slice().sort((a, b) => b.commentsCount - a.commentsCount);
      mostCommentedFilmInfo.slice(0, filmListExtraElement.length).forEach((film) => {
        renderFilmCard(filmExtraContainerElements, film);
      });
    }
  });

  const showMoreBtnComponent = new ShowMoreBtnComponent();
  render(filmListElement, showMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreBtnComponent.getElement().addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + FilmSetting.SHOWING_FILM_COUNT_BY_BUTTON;
    filmInfo.slice(prevFilmsCount, showingFilmsCount)
        .forEach((film) => renderFilmCard(filmContainerElement, film));

    if (showingFilmsCount >= filmInfo.length) {
      showMoreBtnComponent.getElement().remove();
      showMoreBtnComponent.removeElement();
    }
  });
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const navigations = generateNavigation();
const filmInfo = generateFilms(FilmSetting.COUNT);

render(siteHeaderElement, new UserLevelComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationComponent(navigations).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
const filmSectionComponent = new FilmSectionComponent();
render(siteMainElement, filmSectionComponent.getElement(), RenderPosition.BEFOREEND);
renderFilmSection(filmSectionComponent, filmInfo);
render(siteFooterElement, new FooterStatisticsComponent().getElement(), RenderPosition.BEFOREEND);

// Обработчик переключателя для меню и сортировки
const siteNavigation = siteMainElement.querySelector(`.main-navigation`);
const siteNavigationLinks = siteNavigation.querySelectorAll(`.main-navigation__item`);
const siteSortbuttons = siteMainElement.querySelectorAll(`.sort__button`);

const toggleElement = (elements, someClass) => {
  for (const element of elements) {
    element.onclick = function () {
      for (const elementActive of elements) {
        if (elementActive.classList.contains(someClass)) {
          elementActive.classList.remove(someClass);
        }
      }
      element.classList.toggle(someClass);
    };
  }
};

toggleElement(siteSortbuttons, `sort__button--active`);
toggleElement(siteNavigationLinks, `main-navigation__item--active`);
