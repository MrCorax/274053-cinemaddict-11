const createMainNavigationMarkup = (navigation, itemCount, isActive) => {
  const {name, count} = navigation;

  return (
    `<a href="#all"
    class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
    ${name}
    ${itemCount ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`
  );
};

export const createMainNavigationTemplate = (navigations) => {
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
