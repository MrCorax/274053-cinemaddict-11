import {createElement} from "../utils.js";

const createFilmExtraTemplate = (blockName) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${blockName}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmExtraSection {
  constructor(blockName) {
    this._blockName = blockName;
    this._element = null;
  }

  getTemplate() {
    return createFilmExtraTemplate(this._blockName);
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
