const axios = require('axios')
const ResponseType = require(__dirname.split('src')[0] + 'src/main/global/models/response-type')

module.exports = async function (req, res) {
  const { type, name } = req.query

  let response = null

  if (type && name) {
    response = await axios.get(`https://wydmisc.raidhut.com.br/droplist/global-br/data/${type}/${name}.json`)
  } else {
    response = await axios.get('https://wydmisc.raidhut.com.br/droplist/global-br/data/all.json')
  }

  return res.json(new ResponseType(0, 'Sucesso', JSON.parse(response.data.substr(1))))
}
