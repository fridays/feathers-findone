function copy (source) {
  var target = {}
  Object.keys(source || {}).forEach(function (key) {
    target[key] = source[key]
  })
  return target
}

module.exports = function () {
  return function (app) {
    app.mixins.push(function (service) {
      service.findOne = function (params) {
        params = copy(params)
        params.query = copy(params.query)
        params.query.$limit = 1
        return service.find(params).then(function (result) {
          var data = result.data || result
          return Array.isArray(data) ? data[0] : data
        })
      }
    })
  }
}
