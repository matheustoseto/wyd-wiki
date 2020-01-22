const pjson = require('../../package.json')
const ResponseType = require(__dirname.split('src')[0] + 'src/main/global/models/response-type')

const ItemListController = require('./modules/item/list-controller')

module.exports = function (routes) {
  // default
  routes.get('/version', function (req, res) {
    res.json(new ResponseType(0, 'Sucesso', pjson.version))
  })

  // ItemController
  routes.get('/item', ItemListController)

  return routes
}
