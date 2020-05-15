import AbstractComponent from "components/abstract-component";

const createMainNavigationMarkup = (navigation, itemCount, isActive) => {
  const {name, count} = navigation;
  const activeItem = isActive ? `main-navigation__item--active` : ``;

  return (
    `<a href="#all"
    class="main-navigation__item ${activeItem}">
    ${name}
    ${itemCount ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`
  );
};

const createMainNavigationTemplate = (navigations) => {
  const mainNavigationMarkup = navigations.map((it, i) => createMainNavigationMarkup(it, i !== 0, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${mainNavigationMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractComponent {
  constructor(navigations) {
    super();

    this._navigations = navigations;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._navigations);
  }
}
