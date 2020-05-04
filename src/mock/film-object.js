import {TITLE_FILMS,
  POSTER_FILMS,
  DESCRIPTION_FILMS,
  MOVIE_GENRES,
  FILM_RATINGS,
  COUNTRIES,
  PEOPLE} from "../consts";
import {
  getRandomNumber,
  getRandomIntegerValue,
  getRandomArrayItem,
  getRandomArray,
  getRandomDate} from "Utils/common";
const newDate = new Date();

export const generateFilm = () => {
  return {
    poster: POSTER_FILMS[getRandomArrayItem(POSTER_FILMS)],
    filmTitle: TITLE_FILMS[getRandomArrayItem(TITLE_FILMS)],
    raiting: getRandomNumber(0, 10),
    dateOfIssue: getRandomDate(newDate, getRandomIntegerValue(1929, 1965)),
    duration: getRandomIntegerValue(0, 3) === 0 ? getRandomIntegerValue(10, 60) + `min` : getRandomIntegerValue(1, 3) + `h ` + getRandomIntegerValue(0, 60) + `min`,
    movieGenre: getRandomArray(MOVIE_GENRES, getRandomIntegerValue(1, 4)),
    description: getRandomArray(DESCRIPTION_FILMS, getRandomIntegerValue(1, DESCRIPTION_FILMS.length)).join(` `),
    commentsCount: getRandomIntegerValue(0, 20),
    filmDirector: PEOPLE[getRandomArrayItem(PEOPLE)],
    screenwriters: getRandomArray(PEOPLE, getRandomIntegerValue(1, PEOPLE.length)).join(`, `),
    cast: getRandomArray(PEOPLE, getRandomIntegerValue(1, PEOPLE.length)).join(`, `),
    country: COUNTRIES[getRandomArrayItem(COUNTRIES)],
    ageRating: FILM_RATINGS[getRandomArrayItem(FILM_RATINGS)]
  };
};

export const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};
