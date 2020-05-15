import AbstractComponent from "components/abstract-component";

const createNoFilmSectionTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`
  );
};

export default class NoFilmSection extends AbstractComponent {
  getTemplate() {
    return createNoFilmSectionTemplate();
  }
}
