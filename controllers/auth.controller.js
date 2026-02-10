import LoginAuthService from '../services/auth/login.service.js'
import { handleResponse } from '../utils/handleResponse.util.js'

class AuthController {
  async login(req, res, next) {
    try {
      const service = LoginAuthService.execute({
        ...req.body
      }, req.context)

      const user = await service.run();

      handleResponse(res, {
        status: 201,
        message: "User Login SuccessFully!",
        data: user
      });

    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
