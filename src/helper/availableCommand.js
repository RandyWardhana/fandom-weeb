const command = [
  'arknight',
  'bandori',
  'bokuben',
  'dota',
  'hi3',
  'vtuber',
]

export const checkAvailableCommand = command

export const mapAvailableCommand = () => {
  let availableCommand = []

  command.map((item) => {
    availableCommand.push('`<' + item + '>`')
  })

  return `Search character from spesific Fandom. Available fandom\n${availableCommand.join(' ')}`
}