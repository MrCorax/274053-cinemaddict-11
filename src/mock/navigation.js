const navigationItemNames = [
  `All movies`, `Watchlist`, `History`, `Favorites`
];

const generateNavigation = () => {
  return navigationItemNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 13),
    };
  });
};

export {generateNavigation};
