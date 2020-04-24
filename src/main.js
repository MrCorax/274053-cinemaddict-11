import {createUserLevelTemplate} from "./components/user-level.js";
import {createMainNavigationTemplate} from "./components/main-navigation.js";
import {createSortTemplate} from "./components/sort.js";
// import {createStatisticTemplate} from "./components/statistic.js";
import {createFilmSectionTemplate} from "./components/film-section.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createFilmExtraTemplate} from "./components/film-extra-section.js";
import {createBtnCardTemplate} from "./components/btn-card.js";
import {createFooterStatisticsTemplate} from "./components/footer_statistics.js";
import {createPopapTemplate} from "./components/film-popap-detail.js";
import {createCommentPopapTemplate} from "./components/film-popap-comment.js";
import {generateNavigation} from "./mock/navigation.js";
import {generateFilms} from "./mock/film-object.js";
import {generateComments} from "./mock/comments.js";

const ESC_KEY = `Escape`;

const filmSettings = {
  COUNT: 15,
  SHOWING_FILM_COUNT_ON_START: 5,
  SHOWING_FILM_COUNT_BY_BUTTON: 5,
  EXTRA_COUNT: 2
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const navigations = generateNavigation();

render(siteHeaderElement, createUserLevelTemplate(), `beforeend`);
render(siteMainElement, createMainNavigationTemplate(navigations), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
// render(siteMainElement, createStatisticTemplate(), `beforeend`);
render(siteMainElement, createFilmSectionTemplate(), `beforeend`);

const filmInfo = generateFilms(filmSettings.COUNT);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmListElement = filmsElement.querySelector(`.films-list`);
const filmContainerElement = filmListElement.querySelector(`.films-list__container`);

let showingFilmsCount = filmSettings.SHOWING_FILM_COUNT_ON_START;
// рендинг карточек фильма
filmInfo.slice(0, showingFilmsCount)
  .forEach((film) => render(filmContainerElement, createFilmCardTemplate(film), `beforeend`));

// добавление 2-х карточек фильма к Top rated и Most comment.
render(filmsElement, createFilmExtraTemplate(`Top rated`), `beforeend`);
render(filmsElement, createFilmExtraTemplate(`Most comment`), `beforeend`);

const filmExtraInfo = generateFilms(filmSettings.EXTRA_COUNT);
const extraFilmsElement = filmsElement.querySelectorAll(`.films-list--extra`);

// в обоих топиках фильмы одинаковые... надо поправить
extraFilmsElement.forEach((element) => {
  const extraFilmContainerElement = element.querySelector(`.films-list__container`);
  for (let i = 0; i < filmExtraInfo.length; i++) {
    render(extraFilmContainerElement, createFilmCardTemplate(filmExtraInfo[i]), `beforeend`);
  }
});

// рендинг кнопки "Show more"
render(filmListElement, createBtnCardTemplate(), `beforeend`);

const footerStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatisticElement, createFooterStatisticsTemplate(), `beforeend`);

const renderPopap = () => {
  // рендеринг попапа
  render(siteFooterElement, createPopapTemplate(filmInfo[0]), `afterend`);

  const popapElement = document.querySelector(`.film-details`);
  const popapFormElement = popapElement.querySelector(`.film-details__inner`);

  // рендеринг комментариев попапа
  render(popapFormElement, createCommentPopapTemplate(generateComments(filmInfo[0].commentsCount)), `beforeend`);

  const onPopapEscPress = (evt) => {
    if (evt.key === ESC_KEY) {
      closePopap();
    }
  };

  document.addEventListener(`keydown`, onPopapEscPress);

  const buttonPopapClose = popapFormElement.querySelector(`.film-details__close-btn`);

  // Закрытие попапа
  const closePopap = () => {
    popapElement.remove();
    document.removeEventListener(`keydown`, onPopapEscPress);
  };

  buttonPopapClose.onclick = function () {
    closePopap();
  };
};

// Обработчик клика для создания попапа
const popapOpenByPoster = filmContainerElement.getElementsByClassName(`film-card__poster`);
const popapOpenByTitle = filmContainerElement.getElementsByClassName(`film-card__title`);
const popapOpenByComments = filmContainerElement.getElementsByClassName(`film-card__comments`);

const popapOpen = (items) => {
  for (const elementPopapOpen of items) {
    elementPopapOpen.onclick = function () {
      renderPopap();
    };
  }
};

popapOpen(popapOpenByPoster);
popapOpen(popapOpenByTitle);
popapOpen(popapOpenByComments);

// Обработчик клика по кнопке "Show more"
const showMoreButton = filmListElement.querySelector(`.films-list__show-more`);
showMoreButton.onclick = function () {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + filmSettings.SHOWING_FILM_COUNT_BY_BUTTON;
  filmInfo.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmContainerElement, createFilmCardTemplate(film), `beforeend`));

  if (showingFilmsCount >= filmInfo.length) {
    showMoreButton.remove();
  }

  popapOpen(popapOpenByPoster);
  popapOpen(popapOpenByTitle);
  popapOpen(popapOpenByComments);
};

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
