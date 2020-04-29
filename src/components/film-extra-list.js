import {createElement} from "../utils";

const createFilmListExtraTemplate = (blockName) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${blockName}</h2>
    </section>`
  );
};

export default class FilmExtraSection {
  constructor(blockName) {
    this._blockName = blockName;
    this._element = null;
  }

  getTemplate() {
    return createFilmListExtraTemplate(this._blockName);
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
