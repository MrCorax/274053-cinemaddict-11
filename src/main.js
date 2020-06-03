import UserLevelComponent from "components/header-components/user-level";
import MainNavigationComponent from "components/main-components/main-navigation";
import FilmSectionComponent from "components/main-components/film-components/film-section";
import FooterStatisticsComponent from "components/footer-components/footer-statistics";
import PageController from "controllers/page";
import {generateNavigation} from "mock/navigation";
import {generateFilms} from "mock/film-object";
import {render} from "utils/render";
import {Count, RenderPosition} from "./consts";

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
export const siteFooterElement = document.querySelector(`.footer`);

const navigations = generateNavigation();
const filmInfo = generateFilms(Count.FILMS);

render(siteHeaderElement, new UserLevelComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationComponent(navigations), RenderPosition.BEFOREEND);
const filmSectionComponent = new FilmSectionComponent();
const pageController = new PageController(filmSectionComponent);
render(siteMainElement, filmSectionComponent, RenderPosition.BEFOREEND);
pageController.render(filmInfo);
render(siteFooterElement, new FooterStatisticsComponent(), RenderPosition.BEFOREEND);

// Обработчик переключателя для меню и сортировки, ненужный в таком виде и на данном участке.
const siteNavigation = siteMainElement.querySelector(`.main-navigation`);
const siteNavigationLinks = siteNavigation.querySelectorAll(`.main-navigation__item`);
const siteSortbuttons = siteMainElement.querySelectorAll(`.sort__button`);

const toggleElement = (elements, someClass) => {
  for (const element of elements) {
    element.addEventListener(`click`, function () {
      for (const elementActive of elements) {
        if (elementActive.classList.contains(someClass)) {
          elementActive.classList.remove(someClass);
        }
      }
      element.classList.toggle(someClass);
    });
  }
};

toggleElement(siteSortbuttons, `sort__button--active`);
toggleElement(siteNavigationLinks, `main-navigation__item--active`);
