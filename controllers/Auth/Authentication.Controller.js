const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const { response } = require('../../helpers/response.formatter')
const logger = require('../../errorHandler/logger')
const baseConfig = require('../../config/base.config')
const Validator = require('fastest-validator')
const User = require('../../models/User')
const UserData = require('../../models/UserData')
const Role = require('../../models/Role')
const Token = require('../../models/Token')

const v = new Validator()

const AuthController = {
  RegisterUser: async (req, res) => {
    const reqBody = req.body

    const schema = {
      name: {
        type: 'string'
      },
      email: {
        type: 'email'
      },
      password: {
        type: 'string'
      }
    }
    const validate = v.validate(reqBody, schema)

    if (validate !== true) {
      return res.status(400).json(response(400, 'Bad Request', validate))
    }

    try {
      const { name, email, password } = reqBody

      const user = await User.findOne({
        where: {
          email
        }
      })

      if (user) {
        return res.status(400).json(response(400, 'Email already registered'))
      }

      const hashedPassword = passwordHash.generate(password)

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role_id: 3
      })
      logger.info('User created' + newUser)
      return res.status(200).json(response(200, 'Register Success'))
    } catch (error) {
      logger.error(error)
      return res.status(500).json(response(500, 'Internal Server Error'))
    }
  },

  loginUser: async (req, res) => {
    const schema = {
      email: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    }

    const reqBody = req.body

    const validate = v.validate(reqBody, schema)
    if (validate !== true) {
      return res.status(400).json(response(400, 'Bad Request', validate))
    }

    try {
      const { email, password } = reqBody

      const user = await User.findOne({
        where: {
          email
        },
        include: [
          {
            model: UserData,
            attributes: ['first_name', 'last_name']
          },
          {
            model: Role,
            attributes: ['name']
          }
        ]
      })

      if (!user) {
        return res.status(404).json(response(404, 'User not found'))
      }

      const comparePassword = passwordHash.verify(password, user.password)
      if (!comparePassword) {
        return res.status(400).json(response(400, 'Password is incorrect'))
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          role_id: user.Role.id,
          role: user.Role.name,
          user_data: user.UserData
        },
        baseConfig.auth_secret,
        { expiresIn: 864000 }
      )
      // await Token.create({
      //   token
      // })

      const responseData = {
        name: user.name,
        email: user.email,
        role: user.Role.name,
        user_data: user.UserData,
        token,
        type: 'Bearer'
      }

      return res.status(200).json(response(200, 'Login Success', responseData))
    } catch (error) {
      logger.error(error)
      return res.status(500).json(response(500, 'Internal Server Error'))
    }
  },

  logoutUser: async (req, res) => {
    try {
      const token = req.headers.authorization
      await Token.craete({
        data: {
          token
        }
      })

      return res.status(200).json(response(200, 'Logout Success'))
    } catch (error) {
      logger.error(error)
      return res.status(500).json(response(500, 'Internal Server Error'))
    }
  }
}

module.exports = AuthController
