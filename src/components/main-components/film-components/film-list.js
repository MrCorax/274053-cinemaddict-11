import AbstractComponent from "components/abstract-component";

const createFilmListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

export default class FilmListSection extends AbstractComponent {
  getTemplate() {
    return createFilmListTemplate();
  }
}
