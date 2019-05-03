const config = require('../config/app')
const axios = require('axios')

const { username, icon_emoji, hookUrl } = config.slack

const sendAlertToSlack = async (error, title, artist) => {
  try {
    await axios(
      {
        method: 'post',
        url: hookUrl,
        data: {
          text: `⚠️  Track: ${title} by ${artist}, unsuccessfully posted to Slack`,
          username,
          icon_emoji,
        },
      },
      console.log(error.response.data)
    )
  } catch (error) {
    console.error(error)
  }
}

module.exports = sendAlertToSlack
