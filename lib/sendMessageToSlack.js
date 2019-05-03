const config = require('../config/app')
const axios = require('axios')
const chalk = require('chalk')

const sendAlertToSlack = require('./sendAlertToSlack')

const { icon_emoji, hookUrl } = config.slack

const placeholderImageUrl = 'https://i.ibb.co/93QQKhz/placeholder.png'

const sendMessageToSlack = async (url, title, artist, image, album) => {
  const urlParams = url => {
    const urlParamsArray = url.split('/')
    return `${urlParamsArray[urlParamsArray.length - 3]}+${
      urlParamsArray[urlParamsArray.length - 1]
    }`
  }
  const payload = {
    text: `*<${url}|${title} by ${artist}>*`,
    icon_emoji,
    attachments: [
      {
        blocks: [
          {
            type: 'image',
            title: {
              type: 'plain_text',
              text: 'Cover',
            },
            image_url: image === '' ? placeholderImageUrl : image,
            alt_text: album === '' ? 'Cover' : album,
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Search on YouTube',
                },
                url: `https://www.youtube.com/results?search_query=${urlParams(
                  url
                )}`,
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Search on Bandcamp',
                },
                url: `https://bandcamp.com/search?q=${encodeURI(artist)}`,
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Search on Google',
                },
                url: `https://www.google.com/search?q=${urlParams(url)}`,
              },
            ],
          },
        ],
      },
    ],
  }
  try {
    const response = await axios({
      method: 'post',
      url: hookUrl,
      data: payload,
    })
    if (response.status === 200 && response.statusText === 'OK') {
      console.log(
        chalk.white.bgGreen.bold('✅  Track successfully posted to Slack')
      )
    }
  } catch (error) {
    console.log(
      chalk.white.bgRed.bold('⚠️  Track unsuccessfully posted to Slack', error)
    )
    sendAlertToSlack(error, title, artist)
  }
}

module.exports = sendMessageToSlack
