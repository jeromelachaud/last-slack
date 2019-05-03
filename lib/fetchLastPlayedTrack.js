const axios = require('axios')
const sendAlertToSlack = require('./sendAlertToSlack')
const { baseUrl, apiKey } = require('../config/app').lastfm

const fetchLastPlayedTrack = async username => {
  const options = {
    method: 'get',
    url: `${baseUrl}&user=${username}&api_key=${apiKey}&format=json&limi=1`,
  }

  try {
    const response = await axios(options)
    const { data } = response
    if (data.recenttracks && data.recenttracks.track) {
      let track = data.recenttracks.track
      if (Array.isArray(track)) {
        track = track[1]
      }
      return track
    }
  } catch (error) {
    console.log(error)
    sendAlertToSlack(error, 'Last.fm API')
  }
}

module.exports = fetchLastPlayedTrack
