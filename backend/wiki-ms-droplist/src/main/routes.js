const pjson = require('../../package.json')
const ResponseModel = require(__dirname.split('src')[0] + 'src/main/global/models/response-model')

const ItemController = require('./modules/item/item-controller')
const LoadController = require('./modules/load/load-controller')

module.exports = function (routes) {
  // default
  routes.get('/version', function (req, res) {
    res.json(new ResponseModel(0, 'Sucesso', pjson.version))
  })

  // ItemController
  routes.get('/item', ItemController.index)

  // LoadController
  routes.get('/load', LoadController.index)

  return routes
}
