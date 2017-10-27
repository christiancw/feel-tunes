const SET_GENRE = 'SET_GENRE';
const CLEAR_GENRE = 'CLEAR_GENRE';
const CURRENT_GENRE = 'CURRENT_GENRE';

export const setGenre = (sliderValue, genre) => ({ type: SET_GENRE, sliderValue, genre});

export const setCurrentGenre = (selectedGenre) => ({type: CURRENT_GENRE, selectedGenre})

const clearGenre = (sliderValue, genre) => ({ type: CLEAR_GENRE, sliderValue, genre});

const happyGenres = ['chicago-house', 'edm', 'funk', 'latin', 'pop'];
const sadGenres = ['acoustic', 'folk', 'sad', 'soul', 'grunge'];
const disgustGenres = ['indie', 'dubstep', 'goth', 'punk', 'opera'];
const fearGenres = ['alternative', 'deep-house', 'trance', 'jazz', 'classical'];
const angerGenres = ['blues', 'hip-hop', 'opera', 'alt-rock', 'metal'];

const allGenres = happyGenres.concat(sadGenres, disgustGenres, fearGenres, angerGenres);

function addValuesToGenres(genres){
  const valuesObj = {};
  genres.forEach(genre => {
    valuesObj[genre] = 0;
  })
  return valuesObj;
}

const genresWithValues = addValuesToGenres(allGenres);

const initialGenreValues = {
  selectedGenre: '',
  genreValues: genresWithValues
};

// const initialGenreValues = Object.assign(genresWithValues, genreSelected);

export default function (state = initialGenreValues, action) {
  console.log('GENREACTION', action)

  const newState = Object.assign({}, state);

  switch (action.type) {

    case SET_GENRE:
      newState.genreValues[action.genre] = +action.sliderValue;
      break;

    case CLEAR_GENRE:
      newState[action.genre] = 0;
      break;

    case CURRENT_GENRE:
      newState.selectedGenre = action.selectedGenre;
      break;

    default:
      return state;
  }
  return newState;
}
