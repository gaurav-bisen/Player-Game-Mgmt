import createUserService from '../services/users/createUser.service.js';
import getAllUsersService from '../services/users/getAllUsers.service.js';
import {handleResponse} from '../utils/handleResponse.util.js'

class UserController {
    async createUser(req, res, next) {
        try {
            const service = createUserService.execute({
                creator: req.user,
                data: req.body
            }, req.context)
            const user = await service.run();

            handleResponse(res, {
                status: 201,
                message: " User Created SuccessFully!",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllUser(req, res, next) {
        try {
            const service = getAllUsersService.execute({
                ...req.query
            })
            const users = await service.run();

            handleResponse(res, {
                status: 200,
                message: "All Belonging Users fetched SuccessFully!",
                data: users
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController();
