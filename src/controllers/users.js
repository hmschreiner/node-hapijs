import Boom from 'boom'

class UsersController {

    constructor(Users) {
        this.Users = Users;
    }

    async find(request) {
        const { id } = request.params
        const query = {}

        if (id) {
            query._id = id
        }

        try {

            const users = await this.Users.find(query)
            return { users }
            
        } catch (error) {
            return Boom.badRequest('Failed to find user')
        }
    }

    async create(request, h, err) {
        
        try {

            const user = new this.Users(request.payload)
            await user.save()

            return h.response().code(201)
        } catch (error) {
            return Boom.badRequest(error)
        }
    }

    async update(request, h) {
        
        const { id } = request.params

        try {
            const updatedUser = await this.Users.findOneAndUpdate({ _id: id }, request.payload, {
                new: true,
            });

            if (updatedUser) {
                return h.response().code(200)
            }

            return Boom.badRequest('Could not update the user')

            
        } catch (error) {
            return Boom.badRequest(error)
        }
    }

    async delete(request) {
        return Boom.notImplemented()
    }
}

export default UsersController