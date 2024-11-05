const { api_url } = require('../config/base.config')
const AuthRoute = require('./Auth/Auth.route')

module.exports = function (app) {
  app.use(api_url, AuthRoute)

  app.get(api_url, (req, res) => {
    return res.status(200).json({
      message: 'Welcome to API'
    })
  })
}
