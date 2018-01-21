module.exports = () => app => {
  app.mixins.push(service => {
    service.findOne = async (params = {}) => {
      params.query = params.query || {}
      params.query.$limit = 1
      params.paginate = false
      const result = await service.find(params)
      return Array.isArray(result) ? result[0] : result
    }
  })
}
