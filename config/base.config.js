require('dotenv').config()

module.exports = {
  web_name: process.env.WEB_NAME,
  base_url: process.env.BASE_URL,
  api_url: process.env.API_URL || '/api/',

  auth_secret: process.env.AUTH_SECRET
}
