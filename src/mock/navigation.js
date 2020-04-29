import {FilmSetting} from "../consts.js";

const navigationItemNames = [
  `All movies`, `Watchlist`, `History`, `Favorites`
];

const generateNavigation = () => {
  return navigationItemNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * FilmSetting.COUNT),
    };
  });
};

export {generateNavigation};
