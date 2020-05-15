import AbstractComponent from "components/abstract-component";

const createFilmListExtraTemplate = (blockName) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${blockName}</h2>
    </section>`
  );
};

export default class FilmExtraSection extends AbstractComponent {
  constructor(blockName) {
    super();

    this._blockName = blockName;
  }

  getTemplate() {
    return createFilmListExtraTemplate(this._blockName);
  }
}
