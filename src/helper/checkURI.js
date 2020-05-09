export const checkURI = (type) => {
  switch (type) {
    case 'arknight':
      return process.env.ARKNIGHT_URI
    case 'bandori':
      return process.env.BANDORI_URI
    case 'bokuben':
      return process.env.BOKUBEN_URI
    case 'dota':
      return process.env.DOTA_URI
    case 'hi3':
      return process.env.HOUKAI3RD_URI
    case 'vtuber':
      return process.env.VTUBER_URI
    default:
      return process.env.VTUBER_URI
  }
}