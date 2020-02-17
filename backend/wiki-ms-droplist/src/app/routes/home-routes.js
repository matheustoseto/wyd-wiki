module.exports = function (application) {
  console.log(application)
  const ResponseModel = application.src.app.global.models.response

  application.get('/version', function (req, res) {
    res.json(new ResponseModel(0, 'Sucesso', application.get('pjson').version))
  })
}
