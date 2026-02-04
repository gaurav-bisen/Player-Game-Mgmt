import createUserService from '../services/users/createUser.service.js';
import getAllUsersService from '../services/users/getAllUsers.service.js';
import {handleResponse} from '../utils/handleResponse.util.js'

class UserController {
    async createUser(req, res, next) {
        try {
            console.log("=======>>>>req",req.user)
            const user = await createUserService.createUser(req.user, req.body);

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
            const { roleId } = req.query;
            const users = await getAllUsersService.getAllUsers(roleId);

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
