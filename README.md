# FeelTunes

Turning feelings into music.

## Setup


* `npm install`, or `yarn install` - whatever you're into
* Create two postgres databases: `feeltunes` and `feeltunes-test` (right now not in use)
  * By default, running `npm test` will use `feeltunes-test`, while regular development uses `feeltunes`


## Start

`npm start`

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.
