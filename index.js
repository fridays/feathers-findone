module.exports = function () {
  return function (app) {
    app.mixins.push(function (service) {
      service.findOne = function (params) {
        params = params || {}
        params.query = params.query || {}
        params.query.$limit = 1
        return service.find(params).then(function (result) {
          var data = result.data || result
          return Array.isArray(data) ? data[0] : data
        })
      }
    })
  }
}
