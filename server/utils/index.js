const genreParser = (genreObj) => {
  const addGenres = [];
  const removeGenres = [];
  for (let key in genreObj){
    if (genreObj[key] >= 50) {
      addGenres.push(key);
    }
    else if (genreObj[key] !== 0){
      removeGenres.push(key);
    }
  }
  return {
    addGenres,
    removeGenres
  };
};

//take the selected genre array, add any genres from the addArray, delete any from the removeArray

const genreSubstitute = (selectedGenreArray, genresToAddOrRemove) => {
  const withRemoved = selectedGenreArray.filter(genre => {
    return !genresToAddOrRemove.removeGenres.includes(genre);
  });
  const withAdded = withRemoved.concat(genresToAddOrRemove.addGenres).join('&');
  return withAdded;
};


function moodMultiplier(attribute){
  //return a float that can be multiplied with a mood number (btwn 0 and 1) to set a track attribute
  let multiplier;
  switch (attribute){
    case 'energyLevel':
    multiplier = 0.5;
    break;

    case 'danceability':
    multiplier = 0.5;
    break;

    case 'loudness':
    multiplier = -60;
    break;

    case 'mode':
    multiplier = 0.5;
    break;

    case 'valence':
    multiplier = 0.5;
    break;

    default:
    multiplier = 1;

  }
  return multiplier;
}


function moodMapper(moodObjectArr, attributesArr){
  const settingsObject = {'energyLevel': 0, 'danceability': 0, 'loudness': 0, 'mode': 0, 'valence': 0};
  moodObjectArr.forEach(mood => {
    attributesArr.forEach(attribute => {
      settingsObject[attribute] += moodMultiplier(attribute) * mood.score;
    });
  });
  return settingsObject;
}

function deString(objArr){
  const unStrungArr = objArr.map(obj => {
    return JSON.parse(obj);
  });
  return unStrungArr;
}

module.exports = {
  genreParser,
  genreSubstitute,
  moodMapper,
  deString,
};
