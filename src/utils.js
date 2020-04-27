import {MONTH_NAMES} from "./const.js";

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

// генератор случайного числа для оценки
const getRandomNumber = (min, max) => {
  return (min + (Math.random() * (max - min))).toFixed(1);
};

// генератор случайного целого числа
const getRandomIntegerValue = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// генератор случайного индекса массива
const getRandomArrayItem = (array) => {
  const randomItem = getRandomIntegerValue(0, array.length);
  return [randomItem];
};

// генератор случайного массива
const getRandomArray = (array, count) => {
  const randomArrayElements = [];
  while (count) {
    randomArrayElements.push(array[getRandomArrayItem(array)]);
    count--;
  }
  return randomArrayElements;
};

// генерация случайной даты фильма
const getRandomDate = (date, years) => {
  const day = date.getDate();
  const month = MONTH_NAMES[getRandomArrayItem(MONTH_NAMES)];
  const year = years;
  return `${day} ${month} ${year}`;
};

// генерация даты комментация
const getRandomCommentDate = (date) => {
  const day = date.getDate() - Math.floor(Math.random() * date.getDate());
  const month = date.getMonth() - Math.floor(Math.random() * date.getMonth());
  const year = date.getFullYear();
  const hours = date.getHours(date.setHours(getRandomIntegerValue(0, 24), getRandomIntegerValue(0, 60)));
  const minutes = date.getMinutes();

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

export {getRandomNumber, getRandomIntegerValue,
  getRandomArrayItem, getRandomArray,
  getRandomDate, getRandomCommentDate,
  createElement, RenderPosition, render};
