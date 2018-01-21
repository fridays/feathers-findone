module.exports = () => app => {
  app.mixins.push(service => {
    service.findOne = async (params = {}) => {
      params.query = params.query || {}
      params.query.$limit = 1
      const result = await service.find(params)
      const data = result.data || result
      return Array.isArray(data) ? data[0] : data
    }
  })
}
