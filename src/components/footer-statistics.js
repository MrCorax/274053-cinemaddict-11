import {createElement} from "../utils.js";

const createFooterStatisticsTemplate = () => {
  return `<p>130 291 movies inside</p>`;
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
