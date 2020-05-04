import {FilmSetting} from "../consts";

const navigationItemNames = [
  `All movies`, `Watchlist`, `History`, `Favorites`
];

export const generateNavigation = () => {
  return navigationItemNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * FilmSetting.COUNT),
    };
  });
};
