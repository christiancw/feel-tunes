const router = require('express').Router();
module.exports = router;

const userName = process.env.WATSON_USERNAME;
const password = process.env.WATSON_PASSWORD;

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const tone_analyzer = new ToneAnalyzerV3({
  username: userName,
  password: password,
  version_date: '2016-05-19'
});
let tonesArr;
function topFeeling(resp){
  const outerTonesArr = resp.document_tone.tone_categories;
  const innerTonesArr = outerTonesArr[0].tones;
  tonesArr = innerTonesArr;
  let highScore = innerTonesArr[0];
  for (var i = 0; i < innerTonesArr.length; i++){
    if (innerTonesArr[i].score > highScore.score){
      highScore = innerTonesArr[i];
    }
  }
  return highScore.tone_name;
}


router.get('/', (req, res, next) => {
  const inputText = req.query.text;
  const params = {
    text: inputText,
    tones: 'emotion'
  };
  tone_analyzer.tone(params, function(error, response) {
    if (error) {
      console.log('error:', error);
    }
    else {
      const feelingArr = JSON.stringify(response, null, 2);
      res.json({
        topFeeling: topFeeling(response),
        feelingArr: tonesArr
      });
    }
  }
);
});
