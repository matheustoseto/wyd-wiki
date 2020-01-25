const ResponseModel = require(__dirname.split('src')[0] + 'src/main/global/models/response-model')
const DataSchema = require(__dirname.split('src')[0] + 'src/main/global/schema/data-schema')
const DetailsSchema = require(__dirname.split('src')[0] + 'src/main/global/schema/details-schema')

module.exports = {
  async index (req, res) {
    const { type, name } = req.query

    let response = null

    if (type && name) {
      response = await DetailsSchema.findOne({ 'data.type': type, 'data.name': name })
    } else {
      response = await DataSchema.find()
    }

    return res.json(new ResponseModel(0, 'Sucesso', response))
  }
}
