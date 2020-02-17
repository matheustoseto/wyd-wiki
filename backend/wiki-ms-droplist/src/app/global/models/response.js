class ResponseModel {
  constructor (cdRetorno, dsRetorno, data) {
    this.cd_retorno = cdRetorno
    this.ds_retorno = dsRetorno
    this.data = data
  }
}

module.exports = function () {
  return ResponseModel
}
