const Validator = require('fastest-validator')
const logger = require('../../errorHandler/logger')
const { response } = require('../../helpers/response.formatter')
const User = require('../../models/User')
const UserData = require('../../models/UserData')
const Role = require('../../models/Role')
const Pagination = require('../../pagination/pagination')
const { Op } = require('sequelize')
const passwordHash = require('password-hash')

const v = new Validator()

const UserController = {
  getAllUser: async (req, res) => {
    const { showDeleted = null } = req.query
    const page = new Pagination(
      parseInt(req.query.page),
      parseInt(req.query.limit)
    )
    try {
      const conditionsoftDelete = showDeleted === 'true' ? { [Op.not]: null } : { deletedAt: null }

      const { count, rows } = await User.findAndCountAll(
        {
          include: [
            {
              model: Role,
              attributes: ['name']
            },
            {
              model: UserData
            }
          ],
          where: {
            deletedAt: conditionsoftDelete
          },
          limit: page.limit,
          offset: page.offset,
          order: [
            ['id', 'DESC']
          ]
        }
      )
      const response = page.data(count, rows)
      return res.status(200).json(response(200, 'Success', response))
    } catch (error) {
      logger.error(error)
      return res.status(500).json(response(500, 'Internal Server Error'))
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params
    const { showDeleted = null } = req.query

    const conditionsoftDelete = showDeleted === 'true' ? { [Op.not]: null } : { deletedAt: null }
    try {
      const user = await User.findOne({
        where: {
          [Op.and]: [
            { id },
            { deletedAt: conditionsoftDelete }
          ]
        },
        include: [
          {
            model: Role,
            attributes: ['name']
          },
          {
            model: UserData
          }
        ]
      })

      if (!user) {
        return res.status(404).json(response(404, 'User not found'))
      }
      return res.status(200).json(response(200, 'Success', user))
    } catch (error) {
      logger.error(error)
      return res.status(500).json(response(500, 'Internal Server Error'))
    }
  },

  craeteUser: async (req, res) => {
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
        password: hashedPassword
      })
      logger.info('User created' + newUser)
      return res.status(200).json(response(200, 'Register Success'))
    } catch (error) {
      logger.error(error)
      return res.status(500).json(response(500, 'Internal Server Error'))
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params
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
      const user = await User.findOne({
        where: {
          id
        }
      })

      if (!user) {
        return res.status(404).json(response(404, 'User not found'))
      }

      const { name, email, password } = reqBody
      const hashedPassword = passwordHash.generate(password)

      await user.update({
        name,
        email,
        password: hashedPassword
      })

      return res.status(200).json(response(200, 'Update Success'))
    } catch (error) {
      logger.error(error)
      return res.status(500).json(response(500, 'Internal Server Error'))
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params

    try {
      const user = await User.findOne({
        where: {
          id
        }
      })

      if (!user) {
        return res.status(404).json(response(404, 'User not found'))
      }
      await user.destroy()
      return res.status(200).json(response(200, 'Delete Success'))
    } catch (error) {
      logger.error(error)
      return res.status(500).json(response(500, 'Internal Server Error'))
    }
  }
}

module.exports = UserController
