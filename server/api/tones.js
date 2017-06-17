const router = require('express').Router();
module.exports = router;
// const bodyParser = require('body-parser');
var flatten = require('flat')

// router.use(bodyParser.json());

const userName = process.env.WATSON_TONE_CREDS['username'];
const password = process.env.WATSON_TONE_CREDS['password'];
const url = process.env.WATSON_TONE_CREDS.url;

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const tone_analyzer = new ToneAnalyzerV3({
  username: "61a864a7-c1b6-46aa-8342-fd9928b69bf9",
  password: "hy3ge1nipTBw",
  version_date: '2016-05-19'
});

const sampleText = 'I feel so happy about this project.'

const params = {
  // Get the text from the JSON file.
  text: sampleText,
  tones: 'emotion'
};

function topFeeling(resp){
  const outerTonesArr = resp.document_tone.tone_categories;
  const innerTonesArr = outerTonesArr[0].tones;
  let highScore = innerTonesArr[0];
  for (var i = 0; i < innerTonesArr.length; i++){
    if (innerTonesArr[i].score > highScore.score){
      highScore = innerTonesArr[i];
    }
  }
  return highScore.tone_name;
}


router.get('/', (req, res, next) => {
  console.log('REQUEST==>', req)
  tone_analyzer.tone(params, function(error, response) {
    if (error) {
      console.log('error:', error);
    }
    else {
      console.log(JSON.stringify(response, null, 2));
      res.send(topFeeling(response));
    }
  }
);
});

// const topTone = (tonesObj) => {
//
// }
