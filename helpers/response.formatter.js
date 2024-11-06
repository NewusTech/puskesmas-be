const baseConfig = require('../config/base.config')

module.exports = {

  response: (status, message, data) => {
    if (data) {
      return {
        status,
        message,
        data,
        app_name: baseConfig.web_name
      }
    }
    return {
      status,
      message,
      app_name: baseConfig.web_name
    }
  }

}
