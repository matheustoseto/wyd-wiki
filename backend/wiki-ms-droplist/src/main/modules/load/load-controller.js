const axios = require('axios')
const ResponseModel = require(__dirname.split('src')[0] + 'src/main/global/models/response-model')
const DroplistService = require(__dirname.split('src')[0] + 'src/main/global/services/droplist-service')
const DataSchema = require(__dirname.split('src')[0] + 'src/main/global/schema/data-schema')
const DetailsSchema = require(__dirname.split('src')[0] + 'src/main/global/schema/details-schema')

module.exports = {
  async index (req, res) {
    let response = null

    response = await axios.get('https://wydmisc.raidhut.com.br/droplist/global-br/data/all.json')

    const data = JSON.parse(response.data.substr(1))

    await DataSchema.deleteMany()
    await DetailsSchema.deleteMany()

    for (const entity of data) {
      DataSchema.create({
        data: entity
      })

      response = await DroplistService.byQuery(entity.type, entity.name)

      response.type = entity.type

      DetailsSchema.create({
        data: response
      })
    }

    return res.json(new ResponseModel(0, 'Sucesso', null))
  }
}
