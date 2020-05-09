import { checkURI } from './checkURI'

const FandomSearch = (type, uri) => {
  let endpoint = checkURI(type)
  return encodeURI(`${endpoint}/Search/List?query=${uri}&limit=1`)
}

const FandomAvatar = (type, id) => {
  let endpoint = checkURI(type)
  return encodeURI(`${endpoint}/Articles/Details?ids=${id}`)
}

const FandomDetail = (type, id) => {
  let endpoint = checkURI(type)
  return encodeURI(`${endpoint}/Articles/AsSimpleJson?id=${id}`)
}

export { FandomSearch, FandomAvatar, FandomDetail }