import LoginAuthService from '../services/auth/login.service.js'
import {handleResponse} from '../utils/handleResponse.util.js'

class AuthController{
    async login(req, res, next){
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw {
                  status: 400,
                  message: 'Email and password are required'
                };
              }
            
            const user = await LoginAuthService.login(email, password);


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
