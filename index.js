require('dotenv').config()

const checkIfTrackIsNew = require('./lib/checkIfTrackIsNew')
const fetchLastPlayedTrack = require('./lib/fetchLastPlayedTrack')

// Parse args
const commander = require('commander')
commander
  .version('1.0.0')
  .usage('[options] <username>')
  // eslint-disable-next-line quotes
  .option('-q, --quiet', "Don't send message to Slack")
  .parse(process.argv)

if (!commander.args.length) {
  commander.help()
}

const sendMessageToSlack = require('./lib/sendMessageToSlack')
const { fetchDelay } = require('./config/app').lastfm

const app = async username => {
  const lastPlayedTrack = await fetchLastPlayedTrack(username)
  const track = await checkIfTrackIsNew(lastPlayedTrack)
  if (track) {
    if (!commander.quiet) {
      sendMessageToSlack(
        track.url,
        track.name,
        track.artist['#text'],
        track.image['3']['#text'],
        track.album['#text']
      )
    }
  }
  setTimeout(() => app(username), fetchDelay)
}

app(commander.args[0])
