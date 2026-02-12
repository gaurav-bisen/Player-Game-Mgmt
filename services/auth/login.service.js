import db from '../../models/index.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/jwt.util.js';
import BaseHandler from '../../utils/baseHandler.js'
import cacheService from '../redis/redis.service.js'

class LoginAuthService extends BaseHandler{
    async run() {
        const {email, password} = this.args;
        const {transaction} = this.context;

        if (!email || !password) {
            throw {
              status: 400,
              message: 'Email and password are required'
            };
          }

        //find user
        const user = await db.User.findOne({
            where: { email },
            include: [{
                model: db.Role,
                as: 'Role',          // match the alias in User model
            }],
            transaction
        });

        if (!user) {
            const err = new Error('Invalid email or password');
            err.status = 400;
            throw err;
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const err = new Error('Invalid email or password');
            err.status = 401;
            throw err;
        }

        //update last login
        await user.update({ last_login_at: new Date() });

        // Generate JWT
        const token = generateToken({
            id: user.id,
            roleId: user.roleId,
            level: user.Role.level,
            permissions: user.permissions
        });

        //store token in redis
        await cacheService.setLoggedInUser(user.id, token, );

        return { token, user}
    }
}

export default LoginAuthService;