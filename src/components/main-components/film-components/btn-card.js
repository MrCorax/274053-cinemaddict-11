import AbstractComponent from "Components/abstract-component";

const createBtnCardTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return createBtnCardTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
