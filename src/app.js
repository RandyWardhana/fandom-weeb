import dotenv from 'dotenv'
import { Client, Collection, MessageEmbed } from 'discord.js'

import { send } from './response'

dotenv.config()

const client = new Client()

client.commands = new Collection()
const botCommands = require('./commands')

const activities_list = [
  "Playing",
  "*fw help for help"
]

Object.keys(botCommands).map(key => {  
  client.commands.set(botCommands[key].name, botCommands[key]);
})

const splitCommand = (prefix, message) => {
  return message.toLowerCase().replace(prefix, '').split(/ /g)
}

const parseCommand = (msg, prefix, message) => {
  const checkParseCommand = message.toLowerCase().startsWith(prefix)
  
  if (checkParseCommand) {
    const split = splitCommand(prefix, message)
    const command = split.shift().toLowerCase()

    if (command == 'help') helperCommand(msg)

    return command
  }
}

const helperCommand = (msg) => {
  let fields = []

  client.commands.map((item) => {
    if (item.label !== '*fw help') fields.push({ name: "`" + item.label + "`", value: item.value })
  })

  const embed = new MessageEmbed()
    .setColor('#08D6D6')
    .setTitle('Fandom Weeb Helper Command')
    .addFields(fields)

  send(msg, embed)
}

client.on('ready', () => {
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1)
    client.user.setActivity(activities_list[index])
  }, 10000)
  console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', msg => {
  if (!msg.author.bot) {
    try {
      const parse = parseCommand(msg, '*fw ', msg.content)
      const checkParsed = msg.content.toLowerCase().startsWith('*fw')
      const split = splitCommand('*fw', msg.content)

      if (checkParsed && !client.commands.has(parse)) send(msg, 'Invalid command, please type `*fw help` to see available commands!')

      client.commands.get(parse).execute(msg, split);
    } catch (e) {

    }
  }
})

client.login(process.env.DISCORD_TOKEN)