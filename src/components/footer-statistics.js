import {createElement} from "../utils";
import {FilmSetting} from "../consts";

const createFooterStatisticsTemplate = () => {
  return `<p>${FilmSetting.COUNT} movies inside</p>`;
};

export default class FooterStatistic {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
