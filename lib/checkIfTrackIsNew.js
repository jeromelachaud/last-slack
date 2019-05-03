const chalk = require('chalk')
const sendAlertToSlack = require('./sendAlertToSlack')

let currentTrack

const checkIfTrackIsNew = track => {
  let trackName
  try {
    trackName = `\n${track.name} by ${track.artist['#text']} \n${track.url}\n${
      track.image['3']['#text']
    }`
    if (currentTrack != trackName) {
      console.log(chalk.bgHex('#d51007').white.bold(trackName))
      currentTrack = trackName
      return track
    }
  } catch (error) {
    console.log(error)
    sendAlertToSlack(error, 'SlackAPI')
  }
}

module.exports = checkIfTrackIsNew
