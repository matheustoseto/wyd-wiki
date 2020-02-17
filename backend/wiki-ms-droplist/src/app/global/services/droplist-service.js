const axios = require('axios')

module.exports = {
  async all () {
    const response = await axios.get('https://wydmisc.raidhut.com.br/droplist/global-br/data/all.json')
    return JSON.parse(response.data.substr(1))
  },
  async byQuery (type, name) {
    const response = await axios.get(`https://wydmisc.raidhut.com.br/droplist/global-br/data/${type}/${name}.json`)
    return JSON.parse(response.data.substr(1))
  }
}
