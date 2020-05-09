import { renderResponse } from './renderResponse'

const clear = (msg) => {
  return msg.delete()
}

const update = (msg, description) => {
  return msg.edit(description)
}

const reply = (msg, description) => {
  return msg.reply(description)
}

const send = (msg, description) => {
  return msg.channel.send(description)
}

const successResponse = (msg, platform) => {
  return update(msg, `Here's what i found on ${platform}: `)
}

const errorResponse = (msg, params, platform) => {
  return send(msg, `Can not found ${params.join(' ')} on ${platform}.`)
}

const failedResponse = (msg, params, platform) => {
  return update(msg, `Can't found ${params.join(' ')} on ${platform}.`)
}

const searching = (msg, params, platform) => {
  return send(msg, `> Searching ${params.join(' ')} on ${platform}...`)
}

const emptyArgument = (msg) => {
  return send(msg, '> Please follow the instructions before use this command! Type `*fw help` for help')
}

export { clear, update, reply, send, successResponse, errorResponse, failedResponse, searching, emptyArgument, renderResponse }