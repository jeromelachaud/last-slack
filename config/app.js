module.exports = {
  lastfm: {
    baseUrl: process.env.BASE_URL,
    apiKey: process.env.LASTFM_API_KEY,
    fetchDelay: process.env.FETCH_DELAY,
  },
  slack: {
    hookUrl: process.env.SLACK_HOOK_URL,
    username: process.env.SLACK_BOT_USERNAME,
    icon_emoji: process.env.SLACK_BOT_ICON,
  },
  serverUrl:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`,
}
