import Axios from 'axios'
import _ from 'lodash'

import { MessageEmbed } from 'discord.js'

import { send, searching, failedResponse, successResponse, errorResponse, emptyArgument, renderResponse } from '../response'
import { checkAvailableCommand, mapAvailableCommand } from '../helper/availableCommand'
import { FandomSearch, FandomAvatar, FandomDetail } from '../helper/endpoint'

const embedResponse = (msg, params, avatar, url, type) => {
  const description = params[0].content[0]

  const embed = new MessageEmbed()
    .setColor('#08D6D6')
    .setTitle(params[0].title)
    .setDescription(_.isEmpty(description) ? '' : _.isEmpty(description.text) ? '' : description.text)
    .setURL(url)
    .setThumbnail(avatar || '')
    .addFields(renderResponse(params, type))
    .setFooter('Powered by Fandom', 'https://i.dlpng.com/static/png/6965866_preview.png')
    .setTimestamp(new Date())

  send(msg, embed)
}

export default {
  label: '*fw fandom <available_fandom> <character>',
  name: 'fandom',
  value: mapAvailableCommand(),
  async execute(msg, args) {
    const [first, second, type, ...remaining] = args

    let capitalize = type[0].toUpperCase() + type.slice(1)

    if (!checkAvailableCommand.includes(type)) emptyArgument(msg)
    else {
      try {
        searching(msg, remaining, `${capitalize} Fandom`).then(async (message) => {
          let search = await Axios.get(FandomSearch(type, remaining))
          // console.log(search, 'SEARCH')

          if (_.isEmpty(search.data.items)) failedResponse(message, remaining, `${capitalize} Fandom`)
          else {
            const { id, url } = search.data.items[0]

            try {
              let detail = await Axios.get(FandomDetail(type, id))
              let avatar = await Axios.get(FandomAvatar(type, id))
              // console.log(detail, 'DETAIL')
              // console.log(avatar, 'AVATAR')

              if (_.isEmpty(detail.data) && _.isEmpty(avatar.data)) failedResponse(message, remaining, `${capitalize} Fandom`)
              else {
                let detailData = detail.data.sections
                let avatarData = avatar.data.items[id].thumbnail

                const image = !_.isEmpty(avatarData) && avatarData.replace(/(\s)/g, '')
                // console.log(detailData, 'DETAIL DATA')
                // console.log(image, 'IMAGE')

                embedResponse(message, detailData, image, url, type)
                successResponse(message, `${capitalize} Fandom`)
              }
            } catch (e) {
              failedResponse(message, remaining, `${capitalize} Fandom`)
            }
          }
        })
      } catch (e) {
        errorResponse(msg, remaining, `${capitalize} Fandom`)
      }
    }
  }
}