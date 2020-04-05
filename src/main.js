import {createUserLevelTemplate} from "./components/user-level.js";
import {createMainNavigationTemplate} from "./components/main-navigation.js";
import {createStatisticTemplate} from "./components/statistic.js";
import {createFilmSectionTemplate} from "./components/film-section.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createFilmExtraTemplate} from "./components/film-extra-section.js";
import {createBtnCardTemplate} from "./components/btn-card.js";
import {createPopapTemplate} from "./components/film-popap-detail.js";

const filmSettings = {
  COUNT: 5,
  EXTRA_COUNT: 2
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createUserLevelTemplate(), `beforeend`);
render(siteMainElement, createMainNavigationTemplate(), `beforeend`);
render(siteMainElement, createStatisticTemplate(), `beforeend`);
render(siteMainElement, createFilmSectionTemplate(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmListElement = filmsElement.querySelector(`.films-list`);
const filmContainerElement = filmListElement.querySelector(`.films-list__container`);

const renderFilmCard = (filmCount, container) => {
  for (let i = 0; i < filmCount; i++) {
    render(container, createFilmCardTemplate(), `beforeend`);
  }
};

renderFilmCard(filmSettings.COUNT, filmContainerElement);

// добавление 2-х карточек фильма к Top rated и Most comment.
render(filmsElement, createFilmExtraTemplate(`Top rated`), `beforeend`);
render(filmsElement, createFilmExtraTemplate(`Most comment`), `beforeend`);

const extraFilmsElement = filmsElement.querySelectorAll(`.films-list--extra`);

extraFilmsElement.forEach((element) => {
  const extraFilmContainerElement = element.querySelector(`.films-list__container`);
  renderFilmCard(filmSettings.EXTRA_COUNT, extraFilmContainerElement);
});

render(filmListElement, createBtnCardTemplate(), `beforeend`);
render(siteFooterElement, createPopapTemplate(), `afterend`);
