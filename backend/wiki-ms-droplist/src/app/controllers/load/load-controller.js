const axios = require('axios')
const ResponseModel = require(__dirname.split('src')[0] + 'src/app/global/models/response')
const DroplistService = require(__dirname.split('src')[0] + 'src/app/global/services/droplist-service')
const DataSchema = require(__dirname.split('src')[0] + 'src/app/global/schemas/data-schema')
const DetailsSchema = require(__dirname.split('src')[0] + 'src/app/global/schemas/details-schema')
const Utils = require(__dirname.split('src')[0] + 'src/app/global/utils/utils')

module.exports = {
  async index (req, res) {
    let response = null

    response = await axios.get('https://wydmisc.raidhut.com.br/droplist/global-br/data/all.json')

    const data = JSON.parse(response.data.substr(1))

    await DataSchema.deleteMany()
    await DetailsSchema.deleteMany()

    for (const entity of data) {
      entity.displayName = Utils.displayName(entity.name)

      DataSchema.create({
        data: entity
      })

      response = await DroplistService.byQuery(entity.type, entity.name)

      response.type = entity.type
      response.displayName = Utils.displayName(entity.name)

      if (response.description) {
        response.description = response.description.replace(/<br\/>/g, ' ')
      }

      if (response.mobs) {
        const arrayMobs = []
        for (const mob of response.mobs) {
          const detail = await DroplistService.byQuery('mob', mob.name)
          let dropMaps = ''
          for (const map of detail.maps) {
            dropMaps += map.name + ', '
          }

          mob.displayName = Utils.displayName(mob.name)
          mob.type = 'mob'
          mob.dropMaps = dropMaps.substring(0, dropMaps.length - 2)

          arrayMobs.push(mob)
        }
        response.mobs = arrayMobs
      }

      if (response.drops) {
        const arrayDrops = []
        for (const drop of response.drops) {
          drop.displayName = Utils.displayName(drop.name)

          arrayDrops.push(drop)
        }
        response.drops = arrayDrops
      }

      DetailsSchema.create({
        data: response
      })
    }

    return res.json(new ResponseModel(0, 'Sucesso', null))
  }
}
