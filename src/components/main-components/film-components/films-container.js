import AbstractComponent from "Components/abstract-component";

const createFilmContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmsContainer extends AbstractComponent {
  getTemplate() {
    return createFilmContainerTemplate();
  }
}
