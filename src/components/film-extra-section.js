export const createFilmExtraTemplate = (blockName) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${blockName}</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};
