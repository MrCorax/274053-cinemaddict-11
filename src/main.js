import UserLevelComponent from "./components/user-level.js";
import MainNavigationComponent from "./components/main-navigation.js";
import SortComponent from "./components/sort.js";
// import StatisticComponent from "./components/statistic.js";
import FilmSectionComponent from "./components/film-section.js";
import FilmsContainerComponent from "./components/films-container.js";
import FilmCardComponent from "./components/film-card.js";
import FilmExtraComponent from "./components/film-extra-section.js";
import ShowMoreBtnComponent from "./components/btn-card.js";
import FooterStatisticsComponent from "./components/footer-statistics.js";
import PopapComponent from "./components/film-popap-detail.js";
import CommentPopapComponent from "./components/film-popap-comment.js";
import {generateNavigation} from "./mock/navigation.js";
import {generateFilms} from "./mock/film-object.js";
import {generateComments} from "./mock/comments.js";
import {render, RenderPosition} from "./utils.js";

const FilmSetting = {
  COUNT: 15,
  SHOWING_FILM_COUNT_ON_START: 5,
  SHOWING_FILM_COUNT_BY_BUTTON: 5,
  EXTRA_COUNT: 2
};

const renderFilmCard = (filmContainerElement, film) => {

  const onFilmCardClick = () => {
    const popapComponent = new PopapComponent(film);

    render(siteFooterElement, popapComponent.getElement(), RenderPosition.AFTEREND);

    const popapFormElement = popapComponent.getElement().querySelector(`.film-details__inner`);

    render(popapFormElement, new CommentPopapComponent(generateComments(film.commentsCount)).getElement(), RenderPosition.BEFOREEND);

    const onPopapEscPress = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        onButtonCloseClick();
        document.removeEventListener(`keydown`, onPopapEscPress);
      }
    };

    document.addEventListener(`keydown`, onPopapEscPress);

    const buttonPopapClose = popapComponent.getElement().querySelector(`.film-details__close-btn`);
    const onButtonCloseClick = () => {
      popapComponent.getElement().remove();
      popapComponent.removeElement();
      document.removeEventListener(`keydown`, onPopapEscPress);
    };
    buttonPopapClose.addEventListener(`click`, onButtonCloseClick);
  };

  const filmCardComponent = new FilmCardComponent(film);
  const openPopapByPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const openPopapByTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const openPopapByComments = filmCardComponent.getElement().querySelector(`.film-card__comments`);
  const forPopapOpen = [openPopapByPoster, openPopapByTitle, openPopapByComments];

  forPopapOpen.forEach((element) => {
    element.addEventListener(`click`, onFilmCardClick);
  });

  render(filmContainerElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmSection = (filmListElement, filmInfo, filmListExtraElement) => {

  render(filmListElement, new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);

  const filmContainerElement = filmListElement.querySelector(`.films-list__container`);
  const filmExtraContainerElement = filmListExtraElement.querySelector(`.films-list__container`);

  let showingFilmsCount = FilmSetting.SHOWING_FILM_COUNT_ON_START;
  filmInfo.slice(0, showingFilmsCount)
    .forEach((film) => {
      renderFilmCard(filmContainerElement, film);
    });

  // рендинг most comment и top raited будет доделан позже.
  const showingFilmsExtraCount = FilmSetting.EXTRA_COUNT;
  filmInfo.slice(0, showingFilmsExtraCount).forEach((film) => {
    renderFilmCard(filmExtraContainerElement, film);
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
// рендинг статистики createStatisticTemplate
const filmSectionComponent = new FilmSectionComponent();
render(siteMainElement, filmSectionComponent.getElement(), RenderPosition.BEFOREEND);
const filmsElement = siteMainElement.querySelector(`.films`);
const filmListElement = filmSectionComponent.getElement().querySelector(`.films-list`);

render(filmsElement, new FilmExtraComponent(`Top rated`).getElement(), RenderPosition.BEFOREEND);
render(filmsElement, new FilmExtraComponent(`Most comment`).getElement(), RenderPosition.BEFOREEND);
const filmListExtraElement = filmSectionComponent.getElement().querySelector(`.films-list--extra`);
renderFilmSection(filmListElement, filmInfo, filmListExtraElement);
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
