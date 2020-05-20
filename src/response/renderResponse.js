import _ from 'lodash'

/** MAPPING RESPONSE */
const mapResponse = (params, filter) => {
  let content = ''
  let elementsFilter = filter == 'Fans'

  params.map((res) => {
    if (res.title.includes(filter)) {
      if (res.content.length > 0) {
        if (elementsFilter) {
          res.content.map((item) => {
            item.elements.map((data, index) => {
              if (index < 1) content += `${data.text}\n\n`
            })
          })
        } else {
          res.content.map((item, index) => {
            if (index < 1) content += `${item.text}\n\n`
          })
        }
      } else {
        content += `${filter} hasn't added yet.`
      }
    } else {
      content += `${filter} hasn't added yet.`
    }
  })

  const replaceContent = content.replace(new RegExp(filter + " hasn't added yet.", "ig"), '')
  const result = _.isEmpty(replaceContent) ? `${filter} hasn't added yet.` : replaceContent

  return result
}

/** RESPONSE DATA */
const renderResponseArknight = (params) => {
  let fields = [
    { name: 'File', value: mapResponse(params, 'File') },
    { name: 'Analysis', value: mapResponse(params, 'Analysis') }
  ]

  return fields
}

const renderResponseBandori = (params) => {
  let fields = [
    { name: 'Appearance', value: mapResponse(params, 'Appearance') },
    { name: 'Personality', value: mapResponse(params, 'Personality') }
  ]

  return fields
}

const renderResponseBokuben = (params) => {
  let fields = [
    { name: 'Appearance', value: mapResponse(params, 'Appearance') },
    { name: 'Personality', value: mapResponse(params, 'Personality') }
  ]

  return fields
}

const renderResponseDota = (params) => {
  let fields = [
    { name: 'Lore', value: mapResponse(params, 'Lore') }
  ]

  return []
}

const renderResponseHi3 = (params) => {
  let fields = [
    { name: 'Personality', value: mapResponse(params, 'Personality') }
  ]

  return fields
}

const renderResponseIdolMaster = (params) => {
  return []
}

const renderResponseKpop = (params) => {
  return []
}

const renderResponseLoveLive = (params) => {
  let fields = [
    { name: 'Personality', value: mapResponse(params, 'Personality') },
    { name: 'Clubs and Hobbies', value: mapResponse(params, 'Clubs and Hobbies') },
  ]

  return fields
}

const renderResponseMarvel = (params) => {
  return []
}

const renderResponseProduce48 = (params) => {
  return []
}

const renderResponseVtuber = (params) => {
  let fields = [
    { name: 'Personality', value: mapResponse(params, 'Personality') },
    { name: 'Fans', value: mapResponse(params, 'Fans') }
  ]

  return fields
}

const renderResponse = (params, type) => {
  switch (type) {
    case 'arknight':
      return renderResponseArknight(params)
    case 'bandori':
      return renderResponseBandori(params)
    case 'bokuben':
      return renderResponseBokuben(params)
    case 'dota':
      return renderResponseDota(params)
    case 'hi3':
      return renderResponseHi3(params)
    case 'idolmaster':
      return renderResponseIdolMaster(params)
    case 'kpop':
      return renderResponseKpop(params)
    case 'love-live':
      return renderResponseLoveLive(params)
    case 'marvel':
      return renderResponseMarvel(params)
    case 'produce48':
      return renderResponseProduce48(params)
    case 'vtuber':
      return renderResponseVtuber(params)
    default:
      return renderResponseArknight(params)
  }
}

export { renderResponse }