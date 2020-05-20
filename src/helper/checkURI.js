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
    case 'idolmaster':
      return process.env.IDOLMASTER_URI
    case 'kpop':
      return process.env.KPOP_URI
    case 'love-live':
      return process.env.LOVELIVE_URI
    case 'marvel':
      return process.env.MARVEL_URI
    case 'produce48':
      return process.env.PRODUCE48_URI
    case 'vtuber':
      return process.env.VTUBER_URI
    default:
      return process.env.VTUBER_URI
  }
}