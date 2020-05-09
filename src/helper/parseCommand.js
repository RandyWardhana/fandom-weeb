import { send } from '../response'

const parseCommand = (prefix, message) => {
  const checkCommand = message.content.toLowerCase().startsWith(prefix)

  if (checkCommand) {
    const split = message.content.toLowerCase().replace(prefix, '').split(/ /g)
    const command = split.shift().toLowerCase()

    return command
  } else {
    send(message, 'Invalid command, please type `*fw help` to see available commands!')
  }
}

export { parseCommand }