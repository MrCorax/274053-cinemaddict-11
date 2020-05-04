import AbstractComponent from "Components/abstract-component";

const createFilmSectionTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmSection extends AbstractComponent {
  getTemplate() {
    return createFilmSectionTemplate();
  }
}
