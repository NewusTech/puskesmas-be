const jwt = require('jsonwebtoken')
const baseConfig = require('../config/base.config')
const { response } = require('../helpers/response.formatter')
const Token = require('../models/Token')

const checkRolesAndLogout = (allowedRoles) => async (req, res, next) => {
  let token
  try {
    token = req.headers.authorization.split(' ')[1]

    if (!token) {
      res.status(403).json(response(403, 'Unauthorized: token not found'))
      return
    }

    jwt.verify(token, baseConfig.auth_secret, async (err, decoded) => {
      if (err) {
        res.status(403).json(response(403, 'Unauthorized: token expired or invalid'))
        return
      }

      const data = decoded

      const tokenCheck = await Token.findOne({ where: { token } })

      if (tokenCheck) {
        res.status(403).json(response(403, 'Unauthorized: already logged out'))
        return
      }
      if (allowedRoles.includes(data.role)) {
        next()
      } else {
        res.status(403).json(response(403, 'Forbidden: insufficient access rights'))
      }
    })
  } catch (err) {
    res.status(500).json(response(500, 'Internal Server Error'))
  }
}

module.exports = {
  checkRolesAndLogout
}
