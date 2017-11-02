const genreParser = (genreObj) => {
  const addGenres = [];
  const removeGenres = [];
  for (let key in genreObj){
    console.log('keey', key)
    if (genreObj[key] >= 50) {
      addGenres.push(key)
    }
    else if (genreObj[key] !== 0){
      removeGenres.push(key)
    }
  }
  return {
    addGenres,
    removeGenres
  }
}

module.exports = genreParser;
