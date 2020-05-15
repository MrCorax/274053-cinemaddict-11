export const TITLE_FILMS = [
  `Made for each other`,
  `Popoye meets sinbad`,
  `Sagebrush trail`,
  `Santa Claus conquers the martians`,
  `The dance of life`,
  `The great flamarion`,
  `The man with the golden arm`
];

export const POSTER_FILMS = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
];

export const DESCRIPTION_FILMS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

export const MOVIE_GENRES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Cartoon`,
  `Mystery`,
  `Comedy`,
  `Film-Noir`
];

export const FILM_RATINGS = [`6+`, `12+`, `16+`, `18+`];

export const COUNTRIES = [
  `Russia`,
  `USA`,
  `Germany`,
  `Great Britain`,
  `Italian`
];

export const PEOPLE = [
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `David O.Selznick`,
  `John Cromwell`,
  `Joe Swerling`,
  `Paul Malvern`
];

export const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

export const TEXT_COMMENTS = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `It could be better`,
  `Wow! must see!`
];

export const COMMENT_EMOTIONS = [
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`
];

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
  BEFOREBEGAN: `beforebegan`
};

export const Count = {
  FILMS: 15,
  GENRE: 1,
  SYMBOLS: 139
};


export const FilmSetting = {
  SHOWING_FILM_COUNT_ON_START: 5,
  SHOWING_FILM_COUNT_BY_BUTTON: 5,
};

export const BlockName = {
  TOP_RATED: `Top Rated`,
  MOST_COMMENTED: `Most Commented`
};

export const SortType = {
  SORT_BY_DATE: `sort-by-date`,
  SORT_BY_RATING: `sort-by-rating`,
  DEFAULT: `default`
};

export const ActiveType = {
  ACTIVE: `active`,
  NON_ACTIVE: `non-active`
};

export const isEscPressed = (evt) => evt.key === `Escape` || evt.key === `Esc`;
