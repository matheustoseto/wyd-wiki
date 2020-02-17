const ResponseModel = require(__dirname.split('src')[0] + 'src/app/global/models/response')
const DataSchema = require(__dirname.split('src')[0] + 'src/app/global/schemas/data-schema')
const DetailsSchema = require(__dirname.split('src')[0] + 'src/app/global/schemas/details-schema')

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
