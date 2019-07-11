import Joi from 'joi'

import UsersController from '../controllers/users'
import UserModel from '../models/users'

const usersController = new UsersController(UserModel);

const userRoute = (server) => {

    server.route({
        method: 'GET',
        path: '/users/{id?}',
        handler: (request, h) => usersController.find(request, h)
    })

    server.route({
        method: 'POST',
        path: '/users',
        handler: (request, h) => usersController.create(request, h),
        options: {
            validate: {
                payload: {
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    email: Joi.string().email().required(),
                }
            }
        }
    })

    server.route({
        method: 'PUT',
        path: '/users/{id}',
        handler: (request, h) => usersController.update(request, h),
        options: {
            validate: {
                payload: {
                    firstName: Joi.string(),
                    lastName: Joi.string(),
                    email: Joi.string().email()
                }
            }
        }
    })

    server.route({
        method: 'DELETE',
        path: '/users/{id}',
        handler: (request, h) => usersController.delete(request, h)
    })
}

module.exports = userRoute