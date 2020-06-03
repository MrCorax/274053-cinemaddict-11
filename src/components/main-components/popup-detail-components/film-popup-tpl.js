import {Count, EMOJI_VALUE} from "../../../consts";

const createPopupGenresMarkup = (movieGenre) => {
  return (
    `<span class="film-details__genre">${movieGenre}</span>`
  );
};

const createAddedEmojiMarkup = (emojiSrc, emojiName) => {
  return (
    `<img src="${emojiSrc}" width="55" height="55" alt="${emojiName}">`
  );
};

const createEmojiMarkup = (emojis) => {
  return emojis.map((value) => {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${value}" value="${value}">
      <label class="film-details__emoji-label" for="emoji-${value}">
        <img src="./images/emoji/${value}.png" width="30" height="30" alt="emoji">
      </label>`
    );
  }).join(`\n`);
};

export const createPopupTemplate = (film, options = {}) => {
  const {poster, filmTitle, raiting, dateOfIssue, duration, movieGenre,
    description, filmDirector, screenwriters, cast, country, ageRating} = film;
  const {isEmojiActive, emojiName, emojiSrc} = options;
  const popupGenreMarkup = movieGenre.map((it) => createPopupGenresMarkup(it)).join(``);
  const addedEmojiMarkup = createAddedEmojiMarkup(emojiSrc, emojiName);
  const filmGenre = movieGenre.length > Count.GENRE ? `Genres` : `Genre`;
  const emojiMarkup = createEmojiMarkup(EMOJI_VALUE);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmTitle}</h3>
                  <p class="film-details__title-original">Original: ${filmTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${raiting}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${filmDirector}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${screenwriters}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${cast}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${dateOfIssue}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${filmGenre}</td>
                  <td class="film-details__cell">
                    ${popupGenreMarkup}</td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" data-name="Add to watchlist" ${!film.isAddWatchlist ? `` : `checked`}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" data-name="Mark as watched" ${!film.isWatched ? `` : `checked`}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" data-name="Mark as favorite" ${!film.isFavorite ? `` : `checked`}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">
              Comments <span class="film-details__comments-count">${film.commentsCount}</span>
            </h3>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${isEmojiActive ? addedEmojiMarkup : ``}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${emojiMarkup}
              </div>
            </div>
          </section>
        </div>

      </form>
    </section>`
  );
};
